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

    if ($role !== 'librarian') {
        http_response_code(403); // Forbidden
        echo json_encode(["error" => "Access denied"]);
        exit();
    }
} catch (Exception $e) {
    http_response_code(401); // Unauthorized
    echo json_encode(["error" => "Invalid token"]);
    exit();
}

if (!isset($_POST['titre'], $_POST['auteur'], $_POST['ISBN'], $_POST['theme'])) {
    http_response_code(400); // Bad request
    echo json_encode(["error" => "All fields are required"]);
    exit();
}
$title = $_POST['titre'];
$author = $_POST['auteur'];
$refe = $_POST['ISBN'];
$theme = $_POST['theme'];
$estDispo = true;
$sql = "INSERT INTO books (titre, auteur, ISBN, theme, estDisponible) VALUES ('$title', '$author', '$refe', '$theme', $estDispo)";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "New record created successfully"]);
} else {
    http_response_code(500); // Internal server error
    echo json_encode(["error" => "Error creating record: " . $conn->error]);
}
$conn->close();

// Set the content type to JSON
header('Content-Type: application/json');
echo json_encode($books);
?>
