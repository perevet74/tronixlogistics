# Tronixs Express Logistics Website - PHP Version

A complete clone of the Tronixs Express Logistics website built with PHP, MySQL, and a functional admin dashboard for managing tracking information.

## Features

- **Complete Website Pages:**
  - Home page with hero sections and service previews
  - Services page (Road, Ocean, Air Freight, Smart Warehousing)
  - Technology page (Infrastructure, Integration, Visibility, Analytics)
  - About page with company information
  - Contact page with quote request form
  - Track & Trace page with real-time tracking

- **Admin Dashboard:**
  - Secure login system
  - Dashboard with statistics
  - Add new shipments
  - Edit existing shipments
  - Add tracking history updates
  - View all quote requests
  - Manage all shipments

- **Database:**
  - MySQL database for shipment tracking
  - Automatic database initialization
  - Tables: shipments, tracking_history, quotes, admin_users

## Requirements

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Apache web server with mod_rewrite enabled

## Installation

1. **Clone or download the project**

2. **Configure Database:**
   - Edit `config/database.php` and update database credentials:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'tronixs_tracking');
   define('DB_USER', 'root');
   define('DB_PASS', '');
   ```

3. **Create Database:**
   - The database will be created automatically on first run
   - Or create manually: `CREATE DATABASE tronixs_tracking;`

4. **Set up Web Server:**
   - Place files in your web server directory (htdocs, www, etc.)
   - Ensure Apache mod_rewrite is enabled
   - The `.htaccess` file will handle routing

5. **Access the Website:**
   - Frontend: `http://localhost/your-project-folder/public/`
   - Admin Login (HTML - Design Preview): `http://localhost/your-project-folder/admin/login.html`
   - Admin Login (PHP - Full Functionality): `http://localhost/your-project-folder/admin/login.php` (if PHP files are restored)

## Default Admin Credentials

- **Username:** `admin`
- **Password:** `admin123`

**⚠️ IMPORTANT:** Change the default password immediately after first login!

## Admin Dashboard Features

### Dashboard
- View statistics (total shipments, pending, in transit, delivered, quotes)
- View recent shipments
- Quick navigation to all sections

### Shipments Management
- View all shipments in a table
- Add new shipments with tracking numbers
- Edit existing shipments
- Update shipment status and location
- Add tracking history updates

### Tracking History
- Add multiple tracking updates for each shipment
- Each update includes: status, location, timestamp, and notes
- Updates are visible to users on the Track & Trace page

### Quote Requests
- View all quote requests submitted through the website
- See customer contact information and requirements

## API Endpoints

- `api/track.php` - POST request with `tracking_number` to get shipment details
- `api/quote.php` - POST request to submit quote requests

## File Structure

```
.
├── admin/
│   ├── login.html         # Admin login page (HTML - Design Preview)
│   ├── dashboard.html     # Admin dashboard (HTML - Design Preview)
│   ├── shipments.html     # View all shipments (HTML - Design Preview)
│   ├── add-shipment.html  # Add new shipment (HTML - Design Preview)
│   ├── edit-shipment.html # Edit shipment (HTML - Design Preview)
│   └── quotes.html        # View quote requests (HTML - Design Preview)
│   Note: PHP files were converted to HTML. For full functionality, restore PHP files.
├── api/
│   ├── track.php          # Tracking API endpoint
│   └── quote.php          # Quote submission API
├── config/
│   └── database.php       # Database configuration and initialization
├── public/
│   ├── index.html         # Home page
│   ├── services.html      # Services page
│   ├── technology.html    # Technology page
│   ├── about.html         # About page
│   ├── contact.html       # Contact page
│   ├── track.html         # Track & Trace page
│   ├── css/
│   │   └── style.css      # Main stylesheet
│   └── js/
│       └── main.js        # Client-side JavaScript
├── .htaccess              # Apache rewrite rules
└── README.md              # This file
```

## Usage

### For Users:
1. Visit the website
2. Use Track & Trace to search for shipments by tracking number
3. Submit quote requests through the contact form

### For Admins:
1. Login at `/admin/login.php`
2. Add new shipments with tracking numbers
3. Update shipment status and location
4. Add tracking history updates as shipments move
5. View and manage all shipments and quote requests

## Security Notes

- Change default admin password immediately
- Use strong passwords for production
- Consider implementing additional security measures (CSRF protection, rate limiting)
- Keep PHP and MySQL updated
- Use HTTPS in production

## Database Schema

### shipments
- id, tracking_number, sender_name, sender_address, recipient_name, recipient_address
- product_details, service_type, status, current_location, origin, destination
- created_at, updated_at

### tracking_history
- id, tracking_number, status, location, timestamp, notes

### quotes
- id, name, email, phone, service_type, origin, destination, weight, dimensions, additional_info, created_at

### admin_users
- id, username, password (hashed), email, created_at

## Support

For issues or questions, please contact: info@tronixssexpress.com

## License

Copyright @ 2021 Tronixs Express Logistics. All Rights Reserved
