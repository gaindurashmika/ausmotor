# Aus Motors - Car Dealership Website

A modern, responsive car dealership website built with HTML, CSS, and JavaScript. Features an admin control panel for managing vehicles and blog posts.

## Features

### 🚗 Main Website
- **Responsive Design**: Works perfectly on all devices
- **Modern UI**: Clean, professional design with green accent colors
- **Hero Section**: Eye-catching banner with search filters
- **Vehicle Categories**: Sedan, Jeep, Sport, Van, Truck
- **Vehicle Listings**: Dynamic display of cars with images, prices, and specs
- **Blog Section**: Latest automotive news and reviews
- **Brand Showcase**: Partner car manufacturer logos
- **Contact Information**: Phone and email details
- **Newsletter Subscription**: Email signup functionality

### 🔧 Admin Control Panel
- **Secure Login**: Username: `admin`, Password: `ausmotors2025`
- **Vehicle Management**: Add, edit, and delete vehicles
- **Blog Management**: Create and manage blog posts
- **Image Control**: Update vehicle and blog images via URL
- **Price Management**: Modify vehicle prices easily
- **Data Persistence**: Changes saved to browser localStorage

## File Structure

```
aus-motors-website/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Getting Started

1. **Download Files**: Save all three files in the same folder
2. **Open Website**: Double-click `index.html` or open in a web browser
3. **Admin Access**: Click "Admin Login" in the header
4. **Login Credentials**: 
   - Username: `admin`
   - Password: `ausmotors2025`

## Admin Panel Usage

### Managing Vehicles
1. **Add New Vehicle**:
   - Fill in vehicle name, location, price
   - Add image URL (use any online image)
   - Set mileage, fuel type, and transmission
   - Click "Add Vehicle"

2. **Edit Vehicle**:
   - Currently shows existing vehicles
   - Delete vehicles using the delete button
   - All changes are saved automatically

### Managing Blog Posts
1. **Add New Blog Post**:
   - Enter blog title and content
   - Add image URL
   - Set publication date
   - Click "Add Blog Post"

2. **Edit Blog Posts**:
   - View all existing blog posts
   - Delete posts using the delete button

## Customization

### Changing Colors
- Edit `styles.css` file
- Main color: `#4CAF50` (green)
- Dark theme: `#1a1a1a`
- Background: `#f9f9f9`

### Adding More Features
- Modify `script.js` for additional functionality
- Update `styles.css` for new styling
- Edit `index.html` for structural changes

### Image Management
- Use any online image URL
- Recommended: Use Unsplash, Pexels, or similar free image services
- Format: `https://example.com/image.jpg`

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Data Storage

- All data is stored in browser localStorage
- Data persists between browser sessions
- No server required for basic functionality
- For production use, consider backend database

## Security Notes

- Admin credentials are stored in plain text (for demo purposes)
- In production, implement proper authentication
- Use HTTPS for secure data transmission
- Consider server-side validation

## Support

For technical support or customization requests:
- Check the code comments for guidance
- Modify the JavaScript functions as needed
- Update CSS classes for styling changes

## License

This project is created for educational and commercial use. Feel free to modify and use for your car dealership business.

---

**Built with ❤️ for Aus Motors**
*Find a vehicle, Ride and Run*