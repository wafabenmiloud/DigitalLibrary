<?php

require '../vendor/autoload.php';
include '../config/db.php';
include '../config/request_config.php';
use \Firebase\JWT\JWT;
use \Firebase\JWT\KEY;

include '../config/config.php';
$secretKey = JWT_SECRET;

// Check if all required fields are present
if (!isset($_POST['email'], $_POST['password'])) {
    http_response_code(400); // Bad request
    echo json_encode(["error" => "Email and password are required"]);
    exit();
}

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    // Verify password
    if (password_verify($password, $row['password'])) {
        // Generate JWT token
        $token_payload = array(
            "id" => $row['id'],
            "card_num" => $row['card_num'],
            "username" => $row['username'],
            "email" => $email,
            "iat" => time(),
            "exp" => time() + (60 * 60) // 1 hour expiration
        );
        $token = JWT::encode($token_payload, $secretKey, 'HS256');
        echo json_encode(["message" => "Login successful", "token" => $token]);
    } else {
        http_response_code(401); // Unauthorized
        echo json_encode(["error" => "Invalid email or password"]);
    }
} else {
    http_response_code(404); // Not found
    echo json_encode(["error" => "User not found"]);
}

$conn->close();
?>
