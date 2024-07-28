<?php
require '../vendor/autoload.php';
include '../config/db.php';
include '../config/config.php';
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
    $secretKey = JWT_SECRET;
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
    } }catch (Exception $e) {
    http_response_code(401); // Unauthorized
    echo json_encode(["error" => "Invalid token"]);
    exit();
}

if (!isset($_POST['username'], $_POST['email'], $_POST['password'], $_POST['confirmPassword'])) {
    http_response_code(400); // Bad request
    echo json_encode(["error" => "All fields are required"]);
    exit();
}
$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];
$confirmPassword = $_POST['confirmPassword'];

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400); // Bad request
    echo json_encode(["error" => "Invalid email format"]);
    exit();
}

// Validate password
if (strlen($password) < 8 ||
    !preg_match('/[A-Z]/', $password) ||
    !preg_match('/[0-9]/', $password) ||
    !preg_match('/[!@#$%^&*(),.?":{}|<>]/', $password)) {
        http_response_code(400); // Bad request

    echo json_encode(["error" => "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character"]);
    exit();
}

// Check if passwords match
if ($password !== $confirmPassword) {
    http_response_code(400); // Bad request
    echo json_encode(["error" => "Passwords do not match"]);
    exit();
}

$hashedPassword = password_hash($password, PASSWORD_BCRYPT);
$role = "librarian";
$sql = "INSERT INTO users (username, email, password, role) VALUES ('$username', '$email', '$hashedPassword', '$role')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "New record created successfully"]);
} else {
    http_response_code(500); // Internal server error
    echo json_encode(["error" => "Error creating record: " . $conn->error]);
}
$conn->close();

// Set the content type to JSON
header('Content-Type: application/json');
echo json_encode($users);
?>
