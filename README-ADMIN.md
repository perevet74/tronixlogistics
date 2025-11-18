# Admin Dashboard - Email & SMS Notifications

## Overview

The admin dashboard now includes comprehensive shipment forms with automatic email and SMS notifications.

## Features

### Comprehensive Shipment Form

The add/edit shipment forms now include all information required to ship any kind of cargo:

#### Sender & Recipient Information
- Full name, email, phone (required for notifications)
- Complete address (street, city, state, ZIP, country)
- Contact details for both parties

#### Shipping Details
- Origin and destination
- Service type (Air, Road, Ocean, Rail Freight)
- Current status and location
- Estimated and actual delivery dates
- Delivery notes

#### Cargo Information
- Cargo type (General, Electronics, Clothing, Food, Machinery, Pharmaceuticals, Automotive, Documents, Other)
- Cargo description
- Quantity

#### Weight & Dimensions
- Weight (kg or lbs)
- Length, Width, Height
- Dimension units (cm, in, m, ft)

#### Value & Insurance
- Declared value
- Currency (USD, EUR, GBP, CAD, AUD)
- Insurance options
- Insurance value

#### Special Requirements
- Fragile handling
- Hazardous materials
- Temperature controlled
- Requires signature on delivery
- Special instructions

## Email & SMS Notifications

### Automatic Notifications

When a shipment is:
- **Created**: Both sender and recipient receive email and SMS notifications
- **Updated**: If status changes, notifications are sent automatically
- **Tracking Update Added**: Notifications sent with new status and location

### Notification Details

**Email Notifications:**
- Professional HTML email template
- Includes tracking number
- Current status and location
- Link to track shipment online
- Company branding and contact information

**SMS Notifications:**
- Short, concise message
- Tracking number
- Current status
- Location (if available)
- Link to track online

### Notification Recipients

- **Sender**: Receives notifications at their email and phone number
- **Recipient**: Receives notifications at their email and phone number

### SMS Gateway

SMS notifications are sent via email-to-SMS gateways:
- AT&T: `phone@txt.att.net`
- Verizon: `phone@vtext.com`
- T-Mobile: `phone@tmomail.net`
- Sprint: `phone@messaging.sprintpcs.com`
- And other major carriers

## Database Schema

The shipments table has been expanded to include:
- Sender/recipient contact information (email, phone)
- Complete address fields (city, state, ZIP, country)
- Comprehensive cargo details
- Weight and dimensions with units
- Value and insurance information
- Special requirements flags
- Delivery dates and notes

## Usage

1. **Add Shipment**: Fill out the comprehensive form with all required information
2. **Email & Phone Required**: Sender and recipient email/phone are required for notifications
3. **Automatic Notifications**: Notifications are sent automatically when:
   - Shipment is created
   - Shipment status is updated
   - New tracking update is added

## Configuration

Email notifications use PHP's `mail()` function. For production:
- Configure SMTP settings in `admin/notifications.php`
- Use a service like SendGrid, Mailgun, or AWS SES
- Configure proper email headers and authentication

SMS notifications use email-to-SMS gateways. For production:
- Consider using SMS API services (Twilio, Nexmo, etc.)
- Update `sendSMSNotification()` function in `admin/notifications.php`

## Files Updated

- `admin/add-shipment.php` - Comprehensive form with all fields
- `admin/edit-shipment.php` - Full edit form with notifications
- `admin/notifications.php` - Email and SMS notification system
- `config/database.php` - Expanded database schema
- `admin/add-shipment.html` - HTML preview version
- `admin/edit-shipment.html` - HTML preview version

## Testing

To test notifications:
1. Add a shipment with valid email addresses and phone numbers
2. Check email inboxes for notification emails
3. Check SMS messages (if email-to-SMS is configured)
4. Update shipment status to trigger additional notifications

