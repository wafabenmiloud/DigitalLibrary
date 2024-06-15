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

    if (!isset($decoded->email)) {
        http_response_code(400); // Bad request
        echo json_encode(["error" => "Invalid token structure"]);
        exit();
    }

    $email = $decoded->email;

    // Fetch the user's role from the database
    $stmt = $conn->prepare("SELECT role FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($role);
    $stmt->fetch();
    $stmt->close();

    if ($role !== 'admin') {
        http_response_code(403); // Forbidden
        echo json_encode(["error" => "Access denied"]);
        exit();
    }
} catch (Exception $e) {
    http_response_code(401); // Unauthorized
    echo json_encode(["error" => "Invalid token"]);
    exit();
}

if (!isset($_POST['id'])) {
    http_response_code(400); // Bad request
    echo json_encode(["error" => "User ID is required"]);
    exit();
}

$id = $_POST['id'];

$stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["message" => "User deleted successfully"]);
} else {
    http_response_code(500); // Internal server error
    echo json_encode(["error" => "Error deleting user: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
