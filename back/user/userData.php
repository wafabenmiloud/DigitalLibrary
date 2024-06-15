<?php

require '../vendor/autoload.php';
include '../config/db.php';
include '../config/request_config.php';
use \Firebase\JWT\JWT;
use \Firebase\JWT\KEY;

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

    $sql = "SELECT card_num, username, email, role FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $userData = $result->fetch_assoc();
        echo json_encode($userData);
    } else {
        http_response_code(404); // Not found
        echo json_encode(["error" => "User not found"]);
    }

} catch (Exception $e) {
    http_response_code(401); // Unauthorized
    echo json_encode(["error" => "Invalid token"]);
}

$conn->close();
?>
