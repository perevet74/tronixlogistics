<?php
// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'tronixs_tracking');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

// Create database connection
function getDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }
}

// Initialize database tables
function initDatabase() {
    try {
        // First create database if it doesn't exist
        $pdo = new PDO("mysql:host=" . DB_HOST . ";charset=" . DB_CHARSET, DB_USER, DB_PASS);
        $pdo->exec("CREATE DATABASE IF NOT EXISTS " . DB_NAME);
        $pdo = null;
        
        // Now connect to the database
        $pdo = getDBConnection();
        
        // Create shipments table with comprehensive fields
        $pdo->exec("CREATE TABLE IF NOT EXISTS shipments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            tracking_number VARCHAR(50) UNIQUE NOT NULL,
            sender_name VARCHAR(255),
            sender_email VARCHAR(255),
            sender_phone VARCHAR(255),
            sender_address TEXT,
            sender_city VARCHAR(255),
            sender_state VARCHAR(255),
            sender_zip VARCHAR(50),
            sender_country VARCHAR(255),
            recipient_name VARCHAR(255),
            recipient_email VARCHAR(255),
            recipient_phone VARCHAR(255),
            recipient_address TEXT,
            recipient_city VARCHAR(255),
            recipient_state VARCHAR(255),
            recipient_zip VARCHAR(50),
            recipient_country VARCHAR(255),
            origin VARCHAR(255),
            destination VARCHAR(255),
            status VARCHAR(50) DEFAULT 'Pending',
            current_location VARCHAR(255),
            service_type VARCHAR(50),
            cargo_type VARCHAR(255),
            cargo_description TEXT,
            weight DECIMAL(10,2),
            weight_unit VARCHAR(10) DEFAULT 'kg',
            length DECIMAL(10,2),
            width DECIMAL(10,2),
            height DECIMAL(10,2),
            dimension_unit VARCHAR(10) DEFAULT 'cm',
            quantity INT DEFAULT 1,
            declared_value DECIMAL(10,2),
            currency VARCHAR(10) DEFAULT 'USD',
            insurance BOOLEAN DEFAULT FALSE,
            insurance_value DECIMAL(10,2),
            special_instructions TEXT,
            fragile BOOLEAN DEFAULT FALSE,
            hazardous BOOLEAN DEFAULT FALSE,
            temperature_controlled BOOLEAN DEFAULT FALSE,
            requires_signature BOOLEAN DEFAULT FALSE,
            estimated_delivery_date DATE,
            actual_delivery_date DATE,
            delivery_notes TEXT,
            product_details TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )");
        
        // Create tracking_history table
        $pdo->exec("CREATE TABLE IF NOT EXISTS tracking_history (
            id INT AUTO_INCREMENT PRIMARY KEY,
            shipment_id INT NOT NULL,
            tracking_number VARCHAR(50) NOT NULL,
            status VARCHAR(50),
            location VARCHAR(255),
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            notes TEXT,
            FOREIGN KEY (shipment_id) REFERENCES shipments(id) ON DELETE CASCADE
        )");
        
        // Create quotes table
        $pdo->exec("CREATE TABLE IF NOT EXISTS quotes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255),
            phone VARCHAR(50),
            service_type VARCHAR(50),
            origin VARCHAR(255),
            destination VARCHAR(255),
            weight VARCHAR(50),
            dimensions VARCHAR(255),
            additional_info TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )");
        
        // Create admin_users table
        $pdo->exec("CREATE TABLE IF NOT EXISTS admin_users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )");
        
        // Create default admin user (username: admin, password: admin123)
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM admin_users WHERE username = 'admin'");
        $stmt->execute();
        if ($stmt->fetchColumn() == 0) {
            $hashedPassword = password_hash('admin123', PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO admin_users (username, password, email) VALUES (?, ?, ?)");
            $stmt->execute(['admin', $hashedPassword, 'admin@tronixssexpress.com']);
        }
        
        return true;
    } catch (PDOException $e) {
        die("Database initialization failed: " . $e->getMessage());
    }
}

// Initialize database on first run
initDatabase();
?>

