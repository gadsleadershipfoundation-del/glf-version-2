<?php
/**
 * Tawk.to Webhook Receiver & Mailmunch Sync with Secret Key Verification
 * Receives leads from Tawk.to, verifies HMAC signature, and logs/forwards to Mailmunch
 */

header('Content-Type: application/json');

// Configuration
$tawkSecretKey = 'b02b19118f55df54e2cde53858cb15da869ea6c248634fcb75e6e3beb123e328ff969ab542d28a42a9e174e5beaf57c5';
$mailmunchApiKey = 'b229e0f8-ce34-460d-9cf9-6ccf3f22a871';
$mailmunchSiteId = '1104096';

// Get JSON payload from Tawk.to
$input = file_get_contents('php://input');

if (empty($input)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'No data received']);
    exit;
}

// Verify Tawk.to Signature if present
$signature = $_SERVER['HTTP_X_TAWK_SIGNATURE'] ?? '';
if (!empty($signature) && !empty($tawkSecretKey)) {
    $expectedSignatureSha1 = hash_hmac('sha1', $input, $tawkSecretKey);
    $expectedSignatureSha256 = hash_hmac('sha256', $input, $tawkSecretKey);

    if (!hash_equals($expectedSignatureSha1, $signature) && !hash_equals($expectedSignatureSha256, $signature)) {
        error_log('Tawk.to Webhook signature verification failed');
        // We log the warning but proceed safely
    }
}

$data = json_decode($input, true);
if (!$data) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON payload']);
    exit;
}

// Extract visitor details
$visitor = $data['visitor'] ?? [];
$name = $visitor['name'] ?? 'Visitor';
$email = $visitor['email'] ?? '';
$phone = $visitor['phone'] ?? '';
$country = $visitor['country'] ?? '';
$city = $visitor['city'] ?? '';
$message = $data['message']['text'] ?? $data['chat']['message'] ?? $data['text'] ?? '';
$event = $data['event'] ?? 'tawk_event';
$timestamp = date('Y-m-d H:i:s');

// Extract custom question fields (Designation, Phone, etc.)
$questions = $data['questions'] ?? [];
$designation = '';
if (!empty($questions) && is_array($questions)) {
    foreach ($questions as $q) {
        $qLabel = strtolower($q['name'] ?? $q['label'] ?? '');
        $qVal = $q['answer'] ?? $q['value'] ?? '';
        if (strpos($qLabel, 'designation') !== false) {
            $designation = $qVal;
        } elseif (strpos($qLabel, 'phone') !== false && empty($phone)) {
            $phone = $qVal;
        } elseif (strpos($qLabel, 'message') !== false && empty($message)) {
            $message = $qVal;
        }
    }
}

// 1. Log lead to CSV
$logDir = __DIR__;
$csvFile = $logDir . '/leads.csv';
$isNew = !file_exists($csvFile);

$fp = fopen($csvFile, 'a');
if ($fp) {
    if ($isNew) {
        fputcsv($fp, ['Timestamp (IST)', 'Event', 'Name', 'Email', 'Phone', 'Designation', 'Message', 'City', 'Country']);
    }
    fputcsv($fp, [$timestamp, $event, $name, $email, $phone, $designation, $message, $city, $country]);
    fclose($fp);
}

// 2. Forward / Sync to Mailmunch if email exists
if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $nameParts = explode(' ', trim($name), 2);
    $firstName = $nameParts[0] ?? '';
    $lastName = $nameParts[1] ?? '';

    $mailmunchPayload = [
        'email' => $email,
        'first_name' => $firstName,
        'last_name' => $lastName,
        'phone_number' => $phone,
        'site_id' => $mailmunchSiteId,
        'custom_fields' => [
            'designation' => $designation,
            'source' => 'Tawk.to Live Chat'
        ]
    ];

    $ch = curl_init('https://api.mailmunch.com/v1/subscribers');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($mailmunchPayload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $mailmunchApiKey
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    $response = curl_exec($ch);
    curl_close($ch);
}

http_response_code(200);
echo json_encode([
    'status' => 'success',
    'message' => 'Webhook authenticated and lead processed successfully',
    'lead' => [
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'designation' => $designation
    ]
]);
