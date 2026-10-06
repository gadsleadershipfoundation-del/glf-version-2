<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
    exit();
}

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$designation = isset($_POST['designation']) ? trim($_POST['designation']) : '';
$other_designation = isset($_POST['other_designation']) ? trim($_POST['other_designation']) : '';
if ($designation === 'Others' && !empty($other_designation)) {
    $designation = 'Others - ' . $other_designation;
}
$city = isset($_POST['city']) ? trim($_POST['city']) : '';
$ref = isset($_POST['ref']) ? trim($_POST['ref']) : 'corporate_coaching_partner';

// Validation
if (empty($name) || empty($email) || empty($phone)) {
    echo json_encode(['status' => 'error', 'message' => 'Please fill in all required fields.']);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'Please enter a valid email address.']);
    exit();
}

$ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'unknown';
$timestamp = date('Y-m-d H:i:s');

// -------------------------------------------------------------
// 1. Mailmunch Direct Sync
// -------------------------------------------------------------
$mailmunchSiteId = '1104096';
$mailmunchWidgetId = '1172402';

$mmData = [
    'email' => $email,
    'first_name' => $name,
    'phone' => $phone,
    'site_id' => $mailmunchSiteId,
    'widget_id' => $mailmunchWidgetId
];

$chMm = curl_init("https://a.mailmunch.co/widgets/$mailmunchWidgetId/submit");
curl_setopt($chMm, CURLOPT_RETURNTRANSFER, true);
curl_setopt($chMm, CURLOPT_POST, true);
curl_setopt($chMm, CURLOPT_POSTFIELDS, http_build_query($mmData));
curl_setopt($chMm, CURLOPT_TIMEOUT, 5);
$mmResponse = curl_exec($chMm);
curl_close($chMm);

// -------------------------------------------------------------
// 2. Google Sheets Integration (via Web App)
// -------------------------------------------------------------
$google_script_url = 'https://script.google.com/macros/s/AKfycbye7sEMO7Rj76ZT2GXi56BaOCPQQ41MdqliWc2jMnEVgqG4brw0aZyv0ghobCt2i-E/exec'; 

if (!empty($google_script_url)) {
    $postData = [
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'designation' => $designation,
        'city' => $city,
        'ref' => $ref,
        'ip' => $ip,
        'timestamp' => $timestamp
    ];
    
    $ch = curl_init($google_script_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $response = curl_exec($ch);
    curl_close($ch);
}

// -------------------------------------------------------------
// 3. Local CSV Storage (Fallback / Local Excel Backup)
// -------------------------------------------------------------
$csvFile = __DIR__ . '/leads.csv';
$fileExists = file_exists($csvFile);

$fp = fopen($csvFile, 'a');
if ($fp) {
    if (!$fileExists) {
        fputcsv($fp, ['Timestamp', 'Name', 'Email', 'Phone', 'Designation', 'City', 'PageReference', 'IPAddress']);
    }
    fputcsv($fp, [$timestamp, $name, $email, $phone, $designation, $city, $ref, $ip]);
    fclose($fp);
}

echo json_encode([
    'status' => 'success',
    'message' => 'Thank you for connecting with us! Our leadership advisory team will contact you shortly.'
]);
?>
