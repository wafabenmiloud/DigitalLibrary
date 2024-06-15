<?php
require '../vendor/autoload.php';
include '../config/db.php';
include '../config/request_config.php';
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

// Check if Authorization header is set
$headers = apache_request_headers();

if (!isset($headers['Authorization'])) {
    http_response_code(401); // Unauthorized
    echo json_encode(["error" => "Authorization header not found"]);
    exit();
}

$authHeader = $headers['Authorization'];
list($jwt) = sscanf($authHeader, 'Bearer %s');

if (!$jwt) {
    http_response_code(401); // Unauthorized
    echo json_encode(["error" => "Token not found"]);
    exit();
}

try {
    $secretKey = "691fd222cc84f449745a9e72cbc00fea99f69b2bf69356a2e08a3531c1eb5f08"; // Change this to your actual secret key
    $decoded = JWT::decode($jwt, new Key($secretKey, 'HS256'));
    $email = $decoded->email;
} catch (Exception $e) {
    http_response_code(401); // Unauthorized
    echo json_encode(["error" => "Invalid token"]);
    exit();
}

// Check if all required fields are present


$oldPassword = isset($_POST['oldPassword']) ? $_POST['oldPassword'] : null;
$newPassword = isset($_POST['newPassword']) ? $_POST['newPassword'] : null;

if (!$oldPassword || !$newPassword) {
    http_response_code(400); // Bad request
    echo json_encode(["error" => "Missing oldPassword or newPassword in request"]);
    exit();
}





$sql = "SELECT password FROM users WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    // Verify old password
    if (password_verify($oldPassword, $row['password'])) {
        // Validate new password
if (!validate_password($newPassword)) {
    http_response_code(400); // Bad request
    echo json_encode(["error" => "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character"]);
    exit();
}
        // Hash new password
        $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);
        // Update password in database
        $update_sql = "UPDATE users SET password='$hashedPassword' WHERE email='$email'";
        if ($conn->query($update_sql) === TRUE) {
            echo json_encode(["message" => "Password changed successfully"]);
        } else {
            http_response_code(500); // Internal server error
            echo json_encode(["error" => "Error updating password"]);
        }
    } else {
        http_response_code(401); // Unauthorized
        echo json_encode(["error" => "Old password is incorrect"]);
    }
} else {
    http_response_code(404); // Not found
    echo json_encode(["error" => "User not found"]);
}

$conn->close();

function validate_password($password) {
    return strlen($password) >= 8 &&
           preg_match('/[A-Z]/', $password) &&
           preg_match('/[0-9]/', $password) &&
           preg_match('/[!@#$%^&*(),.?":{}|<>]/', $password);
}
?>
