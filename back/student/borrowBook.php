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
    $email = $decoded->email;
} catch (Exception $e) {
    http_response_code(401); // Unauthorized
    echo json_encode(["error" => "Invalid token"]);
    exit();
}

// Check if book ID is set
if (!isset($_POST['id'])) {
    http_response_code(400); // Bad request
    echo json_encode(["error" => "book ID is required"]);
    exit();
}

$id = $_POST['id'];

$borrowingDate = date('Y-m-d');
$returnDate = date('Y-m-d', strtotime($borrowingDate. ' + 10 days'));

$sql = "UPDATE books SET estDisponible = 0, borrower_id = ?, borrowing_date = ?, return_date = ? WHERE ID_livre = ?";

if ($stmt = $conn->prepare($sql)) {
    $stmt->bind_param("issi", $userId, $borrowingDate, $returnDate, $id);
    
    if ($stmt->execute()) {
        http_response_code(200); // OK
        echo json_encode(["message" => "Book borrowed successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to borrow book"]);
    }
    
    $stmt->close();
} else {
    http_response_code(500);
    echo json_encode(["error" => "Failed to prepare statement"]);
}

$conn->close();


?>
