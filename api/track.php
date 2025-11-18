<?php
header('Content-Type: application/json');
require_once '../config/database.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $trackingNumber = $data['tracking_number'] ?? '';
    
    if (empty($trackingNumber)) {
        echo json_encode(['success' => false, 'message' => 'Tracking number is required']);
        exit;
    }
    
    try {
        $pdo = getDBConnection();
        
        // Get shipment information
        $stmt = $pdo->prepare("SELECT * FROM shipments WHERE tracking_number = ?");
        $stmt->execute([$trackingNumber]);
        $shipment = $stmt->fetch();
        
        if (!$shipment) {
            echo json_encode(['success' => false, 'message' => 'Tracking number not found']);
            exit;
        }
        
        // Get tracking history
        $stmt = $pdo->prepare("SELECT * FROM tracking_history WHERE shipment_id = ? ORDER BY timestamp DESC");
        $stmt->execute([$shipment['id']]);
        $history = $stmt->fetchAll();
        
        echo json_encode([
            'success' => true,
            'shipment' => $shipment,
            'history' => $history
        ]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>

