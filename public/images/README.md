# Images Directory

This directory contains all images for the website.

## Hero/Banner Images

To change the background images, edit the HTML files and update the `style="background-image: url('images/...');"` attribute:

### Homepage (index.html):
- **Hero Section 1**: `images/hero-bg-1.jpg`
- **Hero Section 2**: `images/hero-bg-2.jpg`
- **Career Section**: `images/career-bg.jpg`

### How to Change Background Images:

1. **Place your image** in the `public/images/` folder
2. **Edit the HTML file** (e.g., `public/index.html`)
3. **Find the section** you want to change (e.g., `<section class="hero hero-1"`)
4. **Update the inline style**:
   ```html
   <section class="hero hero-1" style="background-image: url('images/your-new-image.jpg');">
   ```

## Required Images:

### Hero/Banner Images:
- `hero-bg-1.jpg` - First hero section background
- `hero-bg-2.jpg` - Second hero section background
- `career-bg.jpg` - Career section background

### Feature Icons:
- `feature-1.png` - Affordable Price icon
- `feature-2.png` - Safe & Reliable icon
- `feature-3.png` - 40 Years Experience icon
- `feature-safe-packing.png` - Safe Packing icon
- `feature-transparent-pricing.png` - Transparent Pricing icon
- `feature-right-time.png` - Right Time Delivery icon
- `feature-fastest-shipping.png` - Fastest Shipping icon

### Service Images:
- `welcome-image.jpg` - Welcome section image
- `service-road.jpg` - Road transport service
- `service-air.jpg` - Air transport service
- `service-ocean.jpg` - Ocean transport service
- `service-warehouse.jpg` - Warehouse service
- `service-road-detail.jpg` - Road freight detail
- `service-ocean-detail.jpg` - Ocean freight detail
- `service-air-detail.jpg` - Air freight detail
- `service-warehouse-detail.jpg` - Warehouse detail

### How It Works:
- `step-1.png` - Step 1 icon
- `step-2.png` - Step 2 icon
- `step-3.png` - Step 3 icon

### Office Images:
- `office-us.jpg` - United States office
- `office-canada.jpg` - Canada office
- `office-uk.jpg` - United Kingdom office
- `office-australia.jpg` - Australia office
- `office-south-africa.jpg` - South Africa office
- `office-china.jpg` - China office

### Technology Images:
- `tech-infrastructure.jpg` - Infrastructure data security
- `tech-integration.jpg` - Data integration
- `tech-visibility.jpg` - Visibility reporting
- `tech-analytics.jpg` - Data science analytics

### About Page:
- `about-main.jpg` - About page main image

## Image Specifications:

- **Hero/Banner Images**: Recommended 1920x600px (or similar aspect ratio)
- **Service Images**: Recommended 800x500px
- **Office Images**: Recommended 400x300px
- **Feature Icons**: Recommended 200x200px
- **Step Icons**: Recommended 200x200px

## Notes:

- All images should be optimized for web (compressed)
- Use JPG for photos, PNG for icons/logos with transparency
- Maintain aspect ratios for best display
- Images are referenced with relative paths from the HTML files
