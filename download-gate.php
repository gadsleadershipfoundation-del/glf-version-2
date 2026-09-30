<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <title>Download PDF - GAD's Leadership Foundation</title>
    <!-- Include standard stylesheets -->
    <link rel="stylesheet" href="common.css?v=103">
    <link rel="stylesheet" href="./style.css" />
    <link rel="stylesheet" href="./article.css?v=1.1">
    
    <!-- FA -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    
    <!-- Custom styling for the form -->
    <style>
        .gate-container {
            max-width: 600px;
            margin: 140px auto 100px;
            padding: 40px;
            background: #fff;
            border-radius: 1.5rem;
            box-shadow: 0 10px 35px rgba(0, 0, 0, 0.12);
            text-align: center;
        }
        
        .gate-title {
            font-size: 2.2rem;
            font-weight: 800;
            color: #53369c;
            margin-bottom: 12px;
        }
        
        .gate-desc {
            font-size: 1.1rem;
            color: #666;
            margin-bottom: 30px;
            font-weight: 300;
            line-height: 1.5;
        }
        
        .gate-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
            text-align: left;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .form-group label {
            font-size: 0.95rem;
            font-weight: 600;
            color: #333;
        }
        
        .form-group input {
            padding: 14px 18px;
            font-size: 1rem;
            border: 1px solid #ddd;
            border-radius: 0.75rem;
            outline: none;
            transition: all 0.3s ease;
            background: #fafafa;
        }
        
        .form-group input:focus {
            border-color: #53369c;
            background: #fff;
            box-shadow: 0 0 0 4px rgba(83, 54, 156, 0.1);
        }
        
        .submit-btn {
            background: #000;
            color: #fff;
            padding: 16px;
            font-size: 1.1rem;
            font-weight: 600;
            border: none;
            border-radius: 2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 15px;
            text-align: center;
        }
        
        .submit-btn:hover {
            background: #53369c;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(83, 54, 156, 0.25);
        }
        
        .error-msg {
            color: #d32f2f;
            background: #ffebee;
            padding: 14px;
            border-radius: 0.75rem;
            margin-bottom: 25px;
            font-size: 0.95rem;
            text-align: center;
            font-weight: 500;
        }

        .submit-btn:disabled {
            background: #888;
            cursor: not-allowed;
            transform: none !important;
            box-shadow: none !important;
        }
        
        .spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: #fff;
            animation: spin 1s ease-in-out infinite;
            margin-left: 10px;
            vertical-align: middle;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        .resend-btn {
            background: none;
            border: none;
            color: #53369c;
            font-weight: bold;
            cursor: pointer;
            text-decoration: underline;
            padding: 0;
            font-size: 0.95rem;
        }
    </style>
</head>
<body>
    <div id="header-container"></div>
    <div class="article-height-adjuster no-print"></div>

    <?php
    $ref = isset($_GET['ref']) ? htmlspecialchars($_GET['ref']) : 'articles.html';
    $isBrochure = ($ref === 'brochure');
    $isPartner = ($ref === 'partner' || $ref === 'partner-with-us');
    
    if ($isPartner) {
        $title = 'Partner With Us';
        $desc = 'Fill out this quick form to connect with Mr. GAD and explore strategic partnerships, consulting, and leadership advisory.';
    } elseif ($isBrochure) {
        $title = 'Download Brochure';
        $desc = 'Fill out this quick form to verify and download the GAD Corporate Coaching brochure.';
    } else {
        $title = 'Enter Details to Download';
        $desc = 'Fill out this quick form to download the clean, non-editable PDF of the article.';
    }
    ?>

    <div class="gate-container">
        <h1 class="gate-title"><?php echo $title; ?></h1>
        <p class="gate-desc"><?php echo $desc; ?></p>
        
        <div id="response-msg" style="display: none; padding: 14px; border-radius: 0.75rem; margin-bottom: 25px; font-size: 0.95rem; text-align: center; font-weight: 500; border: 1px solid transparent;"></div>

        <form class="gate-form" id="downloadForm">
            <input type="hidden" name="ref" value="<?php echo $ref; ?>">
            
            <div class="form-group">
                <label for="name">Full Name *</label>
                <input type="text" id="name" name="name" required placeholder="Your Name">
            </div>
            
            <div class="form-group">
                <label for="email">Work Email *</label>
                <input type="email" id="email" name="email" required placeholder="you@company.com">
            </div>
            
            <div class="form-group">
                <label for="phone">Phone Number *</label>
                <input type="tel" id="phone" name="phone" required placeholder="e.g. +91 98765 43210">
            </div>

            <div class="form-group" id="otp-group" style="display: none;">
                <label for="otp">Enter 6-digit Verification Code *</label>
                <input type="text" id="otp" name="otp" placeholder="Enter OTP code" maxlength="6" pattern="\d{6}">
                <p style="font-size: 0.85rem; color: #53369c; margin-top: 8px; line-height: 1.4; background: #f6f4fc; padding: 12px; border-radius: 8px; border-left: 4px solid #53369c; font-weight: 500;">
                    <i class="fa-solid fa-envelope-open-text" style="margin-right: 6px;"></i> Please check your email's <strong>Inbox, Spam, or Promotions</strong> folder for the OTP verification code.
                </p>
                <div id="otp-timer-container" style="font-size: 0.95rem; color: #666; margin-top: 8px;">
                    <span id="otp-timer">Resend OTP in 60s</span>
                    <button id="resendBtn" class="resend-btn" style="display: none;">Resend OTP</button>
                </div>
            </div>
            
            <p id="form-note" style="font-size: 0.85rem; color: #777; text-align: center; margin-top: 10px; margin-bottom: 5px;">
                * We will send a 6-digit OTP code to verify your email.
            </p>
            <button type="submit" id="submitBtn" class="submit-btn">Send Verification OTP</button>
        </form>
    </div>

    <!-- Copyrights -->
    <div class="copyrights no-print">
        <span class="cp-02">
            © Copyright | All rights reserved : GAD'S LEADERSHIP FOUNDATION
        </span>
        <span class="policy-links">
            <a href="./privacy-policy.html">Privacy Policy</a>
            <a href="./product-policy.html">Product Policy</a>
            <a href="./refund-cancellation.html">Refund and Cancellation</a>
            <a href="./terms-condition.html">Terms & Condition</a>
            <a href="./price-policy.html">Price Policy</a>
            <a href="./disclaimer-policy.html">Disclaimer Policy</a>
        </span>
    </div>

    <!-- CommonJs -->
    <script src="./common.js"></script>
    <script src="load.js"></script>
    <script src="menu.js"></script>

    <script>
    document.addEventListener("DOMContentLoaded", function() {
        const form = document.getElementById("downloadForm");
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const phoneInput = document.getElementById("phone");
        const otpGroup = document.getElementById("otp-group");
        const otpInput = document.getElementById("otp");
        const submitBtn = document.getElementById("submitBtn");
        const responseMsg = document.getElementById("response-msg");
        const otpTimer = document.getElementById("otp-timer");
        const resendBtn = document.getElementById("resendBtn");
        const formNote = document.getElementById("form-note");
        
        let currentStep = "send-otp"; // "send-otp" or "verify-otp"
        let countdownInterval;

        function showMsg(message, isSuccess = false) {
            responseMsg.textContent = message;
            responseMsg.style.display = "block";
            if (isSuccess) {
                responseMsg.style.background = "#e8f5e9";
                responseMsg.style.color = "#2e7d32";
                responseMsg.style.borderColor = "#c8e6c9";
            } else {
                responseMsg.style.background = "#ffebee";
                responseMsg.style.color = "#c62828";
                responseMsg.style.borderColor = "#ffcdd2";
            }
        }

        function startTimer(durationSeconds) {
            clearInterval(countdownInterval);
            resendBtn.style.display = "none";
            otpTimer.style.display = "inline";
            let timeRemaining = durationSeconds;
            
            countdownInterval = setInterval(() => {
                if (timeRemaining <= 0) {
                    clearInterval(countdownInterval);
                    otpTimer.style.display = "none";
                    resendBtn.style.display = "inline-block";
                } else {
                    otpTimer.textContent = `Resend OTP in ${timeRemaining}s`;
                    timeRemaining--;
                }
            }, 1000);
        }

        // Resend OTP Action
        resendBtn.addEventListener("click", function(e) {
            e.preventDefault();
            sendOtpRequest();
        });

        function sendOtpRequest() {
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending OTP... <span class="spinner"></span>';
            responseMsg.style.display = "none";

            const formData = new FormData();
            formData.append("name", nameInput.value);
            formData.append("email", emailInput.value);
            formData.append("phone", phoneInput.value);

            fetch("send-otp.php", {
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                submitBtn.disabled = false;
                
                if (data.status === "success") {
                    currentStep = "verify-otp";
                    const refVal = document.querySelector('input[name="ref"]').value;
                    submitBtn.innerHTML = (refVal === 'partner' || refVal === 'partner-with-us') ? 'Verify & Submit' : 'Verify & Download';
                    otpGroup.style.display = "flex";
                    otpInput.required = true;
                    otpInput.focus();
                    
                    // Disable contact inputs
                    nameInput.readOnly = true;
                    emailInput.readOnly = true;
                    phoneInput.readOnly = true;
                    
                    if (formNote) formNote.style.display = "none";
                    
                    showMsg("A verification code has been sent to your email. Please check your Inbox, Spam, or Promotions folder.", true);
                    startTimer(60);
                } else {
                    submitBtn.innerHTML = 'Send Verification OTP';
                    showMsg(data.message || "An error occurred while sending OTP.");
                }
            })
            .catch(err => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Verification OTP';
                showMsg("Network error. Please try again later.");
                console.error(err);
            });
        }

        form.addEventListener("submit", function(e) {
            e.preventDefault();
            
            if (currentStep === "send-otp") {
                sendOtpRequest();
            } else if (currentStep === "verify-otp") {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Verifying... <span class="spinner"></span>';
                responseMsg.style.display = "none";

                const formData = new FormData();
                formData.append("otp", otpInput.value);
                formData.append("ref", document.querySelector('input[name="ref"]').value);

                fetch("verify-otp.php", {
                    method: "POST",
                    body: formData
                })
                .then(res => res.json())
                .then(data => {
                    if (data.status === "success") {
                        const refVal = document.querySelector('input[name="ref"]').value;
                        if (refVal === 'partner' || refVal === 'partner-with-us') {
                            showMsg("Verification successful! Thank you for partnering with us. Our leadership advisory team will contact you shortly.", true);
                            submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Request Submitted';
                            setTimeout(() => {
                                window.location.href = "mr-gad.html";
                            }, 2500);
                        } else {
                            showMsg("Verification successful! Starting download...", true);
                            submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Verified';
                            setTimeout(() => {
                                window.location.href = "download-file.php?ref=" + encodeURIComponent(data.ref);
                            }, 1500);
                        }
                    } else {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = (document.querySelector('input[name="ref"]').value === 'partner') ? 'Verify & Submit' : 'Verify & Download';
                        showMsg(data.message || "Verification failed. Please try again.");
                    }
                })
                .catch(err => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Verify & Download';
                    showMsg("Network error. Please try again later.");
                    console.error(err);
                });
            }
        });
    });
    </script>
</body>
</html>
