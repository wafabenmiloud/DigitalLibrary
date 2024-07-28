<?php
require '../vendor/autoload.php';
include '../config/db.php';
include '../config/request_config.php';
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;
include '../config/config.php';
$secretKey = JWT_SECRET;
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
    $decoded = JWT::decode($jwt, new Key($secretKey, 'HS256'));
    $userId = $decoded->id;
} catch (Exception $e) {
    http_response_code(401); // Unauthorized
    echo json_encode(["error" => "Invalid token"]);
    exit();
}
$sql = "SELECT * FROM notifications where receiver_id = $userId";
$result = $conn->query($sql);

$books = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $books[] = $row;
    }
}

$conn->close();

// Set the content type to JSON
header('Content-Type: application/json');
echo json_encode($books);
?>
