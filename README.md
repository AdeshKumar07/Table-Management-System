# 🍽️ FeastFinder - Restaurant Reservation System

A modern, visually stunning, and highly interactive **Restaurant Reservation System** built with HTML, CSS, and Vanilla JavaScript. This frontend-only application provides a premium user experience inspired by modern apps like Zomato, OpenTable, and Airbnb.

![FeastFinder Banner](https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200)

## ✨ Features

### 🎨 **Modern UI/UX Design**
- **Glassmorphism** effects with blur backgrounds
- **Smooth animations** and transitions throughout
- **Dark mode** toggle 🌙
- **Responsive design** - works on mobile, tablet, and desktop
- **Floating food icons** animation
- **Gradient animated backgrounds**
- **Micro-interactions** (hover effects, button ripples, loading states)

### 📄 **Pages Included**

1. **Landing Page (index.html)**
   - Hero section with animated background
   - Sticky navbar (transparent → solid on scroll)
   - Featured restaurants carousel
   - Statistics counter animation
   - Customer testimonials
   - Smooth scroll animations

2. **Login/Signup Page (login.html)**
   - Beautiful split-screen design
   - Floating labels input fields
   - Form validation (email, password)
   - Toggle between login/signup
   - Social login buttons
   - Password visibility toggle

3. **Restaurant Listing Page (restaurants.html)**
   - Grid layout of restaurant cards
   - Advanced filters (cuisine, price, rating)
   - Live search functionality
   - Pagination
   - Favorites system
   - Sorting options

4. **Restaurant Details Page (details.html)**
   - Large banner image
   - Restaurant information & menu
   - Customer reviews
   - Interactive time slot selection
   - Visual table/seat selection map
   - Quick booking widget

5. **Reservation Page (reservation.html)**
   - Multi-step progress indicator
   - Booking form with validation
   - Guest count selector
   - Special requests field
   - Real-time booking summary
   - Confirmation modal

6. **User Dashboard (dashboard.html)**
   - Statistics overview
   - Upcoming reservations
   - Past reservations
   - Profile section
   - Quick links
   - Cancel booking functionality

### 🧠 **Advanced Features**

- **Fake Authentication System** - localStorage-based login/signup
- **Dynamic Rendering** - All content rendered via JavaScript
- **Reusable Components** - Navbar, cards, modals, toasts
- **Toast Notifications** - Success/error/warning messages
- **Modal Popups** - Booking confirmations, alerts
- **Skeleton Loading** - Smooth loading states
- **Pagination** - Navigate through restaurants
- **Favorites System** - Save favorite restaurants
- **Data Persistence** - All data saved in localStorage

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs directly in browser

### Installation

1. **Clone or download** the project files
2. **Open** `index.html` in your web browser
3. **Start exploring!**

```bash
# If using a local server (optional)
npx serve .

# Or simply open index.html in your browser
open index.html
```

### Default Login Credentials

```
Email: user@example.com
Password: password123
```

Or create a new account through the signup page!

## 📁 Project Structure

```
restaurant-reservation-system/
├── index.html              # Landing page
├── login.html              # Login/Signup page
├── restaurants.html        # Restaurant listing
├── details.html            # Restaurant details
├── reservation.html        # Make reservation
├── dashboard.html          # User dashboard
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── utils.js            # Utility functions
├── assets/
│   └── images/             # Image assets (optional)
└── README.md               # This file
```

## 🎨 Design System

### Color Palette

```css
Primary: #ff6b35 (Orange)
Secondary: #f7931e (Gold)
Accent: #00d4aa (Teal)
Success: #2ecc71 (Green)
Danger: #e74c3c (Red)
Warning: #f39c12 (Yellow)
```

### Typography

- **Headings**: Segoe UI, Tahoma, sans-serif
- **Body**: Segoe UI, Tahoma, sans-serif
- **Font Weights**: 400 (normal), 600 (semibold), 700 (bold), 800 (extrabold)

### Spacing

- **Container**: max-width 1400px
- **Section Padding**: 5rem (80px)
- **Card Padding**: 1.5rem (24px)
- **Gap**: 2rem (32px)

## 💻 Technical Details

### Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Flexbox, Grid, animations, custom properties
- **Vanilla JavaScript** - ES6+, no frameworks
- **localStorage** - Data persistence

### Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Key JavaScript Features

- **ES6 Modules** - Organized code structure
- **Arrow Functions** - Modern syntax
- **Template Literals** - Dynamic HTML generation
- **Destructuring** - Clean data handling
- **Promises/Async** - Smooth operations
- **Local Storage API** - Data persistence
- **DOM Manipulation** - Dynamic rendering
- **Event Delegation** - Efficient event handling

## 🔧 Customization

### Adding More Restaurants

Edit `js/utils.js` and add to the `RestaurantData.restaurants` array:

```javascript
{
    id: 7,
    name: "Your Restaurant",
    cuisine: "Cuisine Type",
    rating: 4.5,
    priceRange: "$$$",
    location: "City, Country",
    image: "https://your-image-url.com/image.jpg",
    description: "Restaurant description...",
    menu: [
        { name: "Dish Name", price: 25 }
    ],
    reviews: [
        { user: "User Name", rating: 5, comment: "Great!" }
    ],
    timeSlots: ["12:00 PM", "1:00 PM", "2:00 PM"],
    tables: 10
}
```

### Changing Colors

Edit CSS custom properties in `css/styles.css`:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    /* ... other colors */
}
```

### Adding New Pages

1. Create new HTML file
2. Link CSS: `<link rel="stylesheet" href="css/styles.css">`
3. Link JS: `<script src="js/utils.js"></script>`
4. Use existing components (navbar, cards, etc.)

## 📱 Responsive Breakpoints

```css
Desktop: 1024px and above
Tablet: 768px - 1023px
Mobile: 480px - 767px
Small Mobile: below 480px
```

## 🎯 Key Features Explained

### Authentication System

The app uses localStorage to simulate authentication:

```javascript
// Login
Auth.login(email, password);

// Signup
Auth.signup({ name, email, phone, password });

// Check if logged in
Auth.isLoggedIn();

// Get current user
Auth.getCurrentUser();

// Logout
Auth.logout();
```

### Reservation System

```javascript
// Create reservation
Reservations.create({
    restaurantId: 1,
    date: "2024-12-25",
    time: "7:00 PM",
    guests: 4,
    table: 5
});

// Get user reservations
Reservations.getByUserId(userId);

// Cancel reservation
Reservations.cancel(reservationId);
```

### Toast Notifications

```javascript
Toast.success('Success message');
Toast.error('Error message');
Toast.warning('Warning message');
```

### Modal Dialogs

```javascript
Modal.show('modalId');
Modal.hide('modalId');
Modal.confirm('Title', 'Message', () => {
    // Confirm callback
});
```

## 🐛 Known Issues & Limitations

1. **No Backend** - All data is stored in localStorage
2. **No Real Authentication** - Passwords stored in plain text (demo only)
3. **Limited Data** - Only 6 sample restaurants
4. **No Payment Integration** - Booking is simulated
5. **Browser Storage** - Data cleared if browser data is cleared

## 🚀 Future Enhancements

- [ ] Add more restaurants and cuisines
- [ ] Implement real backend API
- [ ] Add payment gateway integration
- [ ] Email notifications
- [ ] SMS reminders
- [ ] Restaurant owner dashboard
- [ ] Advanced search with maps
- [ ] Loyalty program
- [ ] Social sharing
- [ ] Multi-language support

## 📄 License

This project is open source and available for personal and commercial use.

## 👨‍💻 Developer

Created with ❤️ as a portfolio project demonstrating modern frontend development skills.

## 🙏 Acknowledgments

- **Images**: Unsplash (https://unsplash.com)
- **Icons**: Emoji icons for simplicity
- **Inspiration**: Zomato, OpenTable, Airbnb

---

## 📞 Support

For questions or issues, please refer to the code comments or create an issue in the repository.

**Happy Dining! 🍽️**
