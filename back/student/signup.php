<?php

include '../config/db.php';
include '../config/request_config.php';

// Check if all required fields are present
if (!isset($_POST['cardNumber'], $_POST['name'], $_POST['email'], $_POST['password'], $_POST['passwordConfirm'])) {
    http_response_code(400); // Bad request

    echo json_encode(["error" => "All fields are required"]);
    exit();
}

$cardNumber = $_POST['cardNumber'];
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$passwordConfirm = $_POST['passwordConfirm'];

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
if ($password !== $passwordConfirm) {
    echo json_encode(["error" => "Passwords do not match"]);
    exit();
}

$hashedPassword = password_hash($password, PASSWORD_BCRYPT);
$role = "student";
$sql = "INSERT INTO users (card_num, username, email, password, role) VALUES ('$cardNumber', '$name', '$email', '$hashedPassword', '$role')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "New record created successfully"]);
} else {
    http_response_code(500); // Internal server error
    echo json_encode(["error" => "Error creating record: " . $conn->error]);
}

$conn->close();
?>
