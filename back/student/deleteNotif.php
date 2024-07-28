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

if (!isset($_POST['id'])) {
    http_response_code(400); // Bad request
    echo json_encode(["error" => "notification ID is required"]);
    exit();
}

$id = $_POST['id'];

$stmt = $conn->prepare("DELETE FROM notifications WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["message" => "notification deleted successfully"]);
} else {
    http_response_code(500); // Internal server error
    echo json_encode(["error" => "Error deleting notification: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
