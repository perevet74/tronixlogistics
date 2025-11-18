# How to Access Admin Dashboard Online

Since all admin files have been converted to HTML, you can access them directly through your web server.

## Access URLs

### Local Development (XAMPP/WAMP/MAMP)

If you're running a local server:

**Admin Login Page:**
```
http://localhost/TRonix ship/admin/login.html
```

**Admin Dashboard:**
```
http://localhost/TRonix ship/admin/dashboard.html
```

**All Admin Pages:**
- Login: `http://localhost/TRonix ship/admin/login.html`
- Dashboard: `http://localhost/TRonix ship/admin/dashboard.html`
- Shipments: `http://localhost/TRonix ship/admin/shipments.html`
- Add Shipment: `http://localhost/TRonix ship/admin/add-shipment.html`
- Edit Shipment: `http://localhost/TRonix ship/admin/edit-shipment.html`
- Quotes: `http://localhost/TRonix ship/admin/quotes.html`

### Online/Hosting (Live Website)

If you've uploaded to a web hosting service:

**Replace `yourdomain.com` with your actual domain:**

**Admin Login Page:**
```
https://yourdomain.com/admin/login.html
```

**Admin Dashboard:**
```
https://yourdomain.com/admin/dashboard.html
```

**All Admin Pages:**
- Login: `https://yourdomain.com/admin/login.html`
- Dashboard: `https://yourdomain.com/admin/dashboard.html`
- Shipments: `https://yourdomain.com/admin/shipments.html`
- Add Shipment: `https://yourdomain.com/admin/add-shipment.html`
- Edit Shipment: `https://yourdomain.com/admin/edit-shipment.html`
- Quotes: `https://yourdomain.com/admin/quotes.html`

## Important Notes

### Current Status (HTML Files)
- ✅ **Design Preview**: All admin pages are now HTML files for design viewing
- ✅ **No Authentication**: Login page redirects directly to dashboard (for design preview)
- ✅ **Sample Data**: Pages show sample data for design purposes
- ❌ **No Functionality**: Forms don't save data (HTML only, no backend)

### For Full Functionality

If you need the admin dashboard to actually work (save shipments, manage data), you have two options:

#### Option 1: Convert Back to PHP
- Restore the PHP files that were deleted
- Set up MySQL database
- Configure `config/database.php` with your database credentials
- Access via: `https://yourdomain.com/admin/login.php`

#### Option 2: Use Static HTML with JavaScript
- Keep HTML files
- Add JavaScript to handle form submissions
- Use a backend API or service for data storage

## Quick Access Guide

### Step 1: Upload Files to Web Server
Upload your entire project folder to your web hosting:
- Via FTP (FileZilla, etc.)
- Via cPanel File Manager
- Via Git deployment

### Step 2: Access Admin Pages
1. Open your web browser
2. Navigate to: `https://yourdomain.com/admin/login.html`
3. The login page will automatically redirect to the dashboard

### Step 3: Navigate Admin Sections
- Use the navigation menu at the top
- All pages are linked and ready to view

## File Structure

```
your-website/
├── admin/
│   ├── login.html          ← Start here
│   ├── dashboard.html
│   ├── shipments.html
│   ├── add-shipment.html
│   ├── edit-shipment.html
│   └── quotes.html
├── public/
│   └── (main website files)
└── config/
    └── database.php        (if using PHP version)
```

## Troubleshooting

### Can't Access Admin Pages?

1. **Check File Paths:**
   - Make sure files are in the `admin/` folder
   - Verify the folder name is exactly `admin` (lowercase)

2. **Check Web Server:**
   - Ensure your web server is running
   - Check if files are in the correct web root directory

3. **Check Permissions:**
   - Files should have read permissions (644)
   - Folders should have execute permissions (755)

4. **Check URL:**
   - Use `.html` extension (not `.php`)
   - Example: `/admin/login.html` not `/admin/login.php`

### CSS/Images Not Loading?

- Check that `public/css/style.css` exists
- Verify image paths in `public/images/`
- Check browser console for 404 errors

## Example URLs

**If your project is in root:**
```
https://yourdomain.com/admin/login.html
```

**If your project is in a subfolder:**
```
https://yourdomain.com/project-folder/admin/login.html
```

**If using a subdomain:**
```
https://admin.yourdomain.com/login.html
```

## Next Steps

1. **For Design Review:** Access the HTML files directly - they're ready to view
2. **For Production Use:** Consider converting back to PHP for full functionality
3. **For Testing:** Use local server first, then deploy to live hosting

