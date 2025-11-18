<?php
header('Content-Type: application/json');
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    try {
        $pdo = getDBConnection();
        
        $stmt = $pdo->prepare("INSERT INTO quotes 
            (name, email, phone, service_type, origin, destination, weight, dimensions, additional_info)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        $stmt->execute([
            $data['name'] ?? '',
            $data['email'] ?? '',
            $data['phone'] ?? '',
            $data['service_type'] ?? '',
            $data['origin'] ?? '',
            $data['destination'] ?? '',
            $data['weight'] ?? '',
            $data['dimensions'] ?? '',
            $data['additional_info'] ?? ''
        ]);
        
        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
?>

