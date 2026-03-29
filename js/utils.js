/**
 * Restaurant Reservation System - Utility Functions
 * Common functions used across all pages
 */

// ============================================
// LocalStorage Management
// ============================================

const Storage = {
    get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },

    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
};

// ============================================
// Authentication System
// ============================================

const Auth = {
    init() {
        // Initialize default users if not exists
        if (!Storage.get('users')) {
            const defaultUsers = [
                {
                    id: 1,
                    email: 'user@example.com',
                    password: 'password123',
                    name: 'John Doe',
                    phone: '+1234567890'
                }
            ];
            Storage.set('users', defaultUsers);
        }
    },

    login(email, password) {
        const users = Storage.get('users') || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            const sessionUser = { ...user };
            delete sessionUser.password;
            Storage.set('currentUser', sessionUser);
            return { success: true, user: sessionUser };
        }
        
        return { success: false, message: 'Invalid email or password' };
    },

    signup(userData) {
        const users = Storage.get('users') || [];
        
        if (users.find(u => u.email === userData.email)) {
            return { success: false, message: 'Email already exists' };
        }

        const newUser = {
            id: users.length + 1,
            ...userData
        };

        users.push(newUser);
        Storage.set('users', users);

        const sessionUser = { ...newUser };
        delete sessionUser.password;
        Storage.set('currentUser', sessionUser);

        return { success: true, user: sessionUser };
    },

    logout() {
        Storage.remove('currentUser');
        window.location.href = 'index.html';
    },

    getCurrentUser() {
        return Storage.get('currentUser');
    },

    isLoggedIn() {
        return !!this.getCurrentUser();
    },

    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
};

// ============================================
// Toast Notifications
// ============================================

const Toast = {
    container: null,

    init() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        }
    },

    show(message, type = 'success', duration = 3000) {
        this.init();

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : '⚠';
        
        toast.innerHTML = `
            <span style="font-size: 1.5rem;">${icon}</span>
            <span>${message}</span>
        `;

        this.container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('hide');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, duration);
    },

    success(message) {
        this.show(message, 'success');
    },

    error(message) {
        this.show(message, 'error');
    },

    warning(message) {
        this.show(message, 'warning');
    }
};

// ============================================
// Modal Management
// ============================================

const Modal = {
    show(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },

    hide(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    },

    confirm(title, message, onConfirm) {
        const modalHtml = `
            <div id="confirmModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${title}</h3>
                        <button class="modal-close" onclick="Modal.hide('confirmModal')">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>${message}</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-ghost" onclick="Modal.hide('confirmModal')">Cancel</button>
                        <button class="btn btn-primary" id="confirmBtn">Confirm</button>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if any
        const existingModal = document.getElementById('confirmModal');
        if (existingModal) {
            existingModal.remove();
        }

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        document.getElementById('confirmBtn').addEventListener('click', () => {
            onConfirm();
            this.hide('confirmModal');
        });

        this.show('confirmModal');
    }
};

// ============================================
// Restaurant Data
// ============================================

const RestaurantData = {
    restaurants: [
        {
            id: 1,
            name: "The Golden Fork",
            cuisine: "Italian",
            rating: 4.8,
            priceRange: "$$$",
            location: "Chandni Chowk, Delhi",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
            description: "Experience authentic Italian cuisine in an elegant atmosphere. Our chefs use only the finest ingredients imported directly from Italy.",
            menu: [
                { name: "Truffle Pasta", price: 28 },
                { name: "Margherita Pizza", price: 18 },
                { name: "Osso Buco", price: 42 },
                { name: "Tiramisu", price: 12 }
            ],
            reviews: [
                { user: "Sarah M.", rating: 5, comment: "Absolutely divine! Best Italian food in the city." },
                { user: "John D.", rating: 5, comment: "The truffle pasta is to die for!" },
                { user: "Emily R.", rating: 4, comment: "Great atmosphere and excellent service." }
            ],
            timeSlots: ["12:00 PM", "1:00 PM", "2:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"],
            tables: 12
        },
        {
            id: 2,
            name: "Sakura Sushi",
            cuisine: "Japanese",
            rating: 4.9,
            priceRange: "$$$$",
            location: "Mohammed Ali Road, Mumbai",
            image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800",
            description: "Premium sushi and traditional Japanese dishes prepared by master chefs with over 20 years of experience.",
            menu: [
                { name: "Omakase Set", price: 85 },
                { name: "Dragon Roll", price: 24 },
                { name: "Wagyu Beef", price: 65 },
                { name: "Matcha Ice Cream", price: 10 }
            ],
            reviews: [
                { user: "Michael K.", rating: 5, comment: "The best sushi experience I've ever had!" },
                { user: "Lisa T.", rating: 5, comment: "Impeccable quality and presentation." },
                { user: "David L.", rating: 5, comment: "Worth every penny. A must-visit!" }
            ],
            timeSlots: ["11:30 AM", "12:30 PM", "1:30 PM", "5:30 PM", "6:30 PM", "7:30 PM", "8:30 PM"],
            tables: 8
        },
        {
            id: 3,
            name: "Le Petit Bistro",
            cuisine: "French",
            rating: 4.7,
            priceRange: "$$$",
            location: "VV Puram, Bangalore",
            image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800",
            description: "Charming French bistro offering classic dishes with a modern twist. Enjoy our extensive wine selection.",
            menu: [
                { name: "Coq au Vin", price: 32 },
                { name: "Duck Confit", price: 38 },
                { name: "Crème Brûlée", price: 14 },
                { name: "French Onion Soup", price: 16 }
            ],
            reviews: [
                { user: "Amanda P.", rating: 5, comment: "Felt like I was in Paris! Amazing food." },
                { user: "Robert H.", rating: 4, comment: "Excellent wine pairing suggestions." },
                { user: "Jennifer W.", rating: 5, comment: "The duck conffit was perfection." }
            ],
            timeSlots: ["12:00 PM", "1:00 PM", "2:00 PM", "6:30 PM", "7:30 PM", "8:30 PM", "9:30 PM"],
            tables: 10
        },
        {
            id: 4,
            name: "Saffron Restaurant",
            cuisine: "Indian",
            rating: 4.6,
            priceRange: "$$",
            location: "Sowcarpet, Chennai",
            image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800",
            description: "Authentic Indian flavors from various regions of India. We offer a wide range of vegetarian and non-vegetarian options.",
            menu: [
                { name: "Butter Chicken", price: 22 },
                { name: "Biryani", price: 20 },
                { name: "Paneer Tikka", price: 18 },
                { name: "Gulab Jamun", price: 8 }
            ],
            reviews: [
                { user: "Priya S.", rating: 5, comment: "Reminded me of home! Authentic flavors." },
                { user: "Chris M.", rating: 4, comment: "Great spice levels and generous portions." },
                { user: "Nina R.", rating: 5, comment: "Best Indian food in NYC!" }
            ],
            timeSlots: ["11:30 AM", "12:30 PM", "1:30 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"],
            tables: 15
        },
        {
            id: 5,
            name: "El Toro Loco",
            cuisine: "Mexican",
            rating: 4.5,
            priceRange: "$$",
            location: "College Street, Kolkata",
            image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800",
            description: "Vibrant Mexican restaurant with traditional recipes and creative cocktails. Live music on weekends!",
            menu: [
                { name: "Tacos Al Pastor", price: 16 },
                { name: "Enchiladas", price: 18 },
                { name: "Guacamole", price: 12 },
                { name: "Churros", price: 10 }
            ],
            reviews: [
                { user: "Carlos R.", rating: 5, comment: "Authentic Mexican flavors! Loved it!" },
                { user: "Jessica L.", rating: 4, comment: "Great margaritas and fun atmosphere." },
                { user: "Mark T.", rating: 4, comment: "The tacos are incredible!" }
            ],
            timeSlots: ["12:00 PM", "1:00 PM", "2:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"],
            tables: 18
        },
        {
            id: 6,
            name: "The Steakhouse",
            cuisine: "American",
            rating: 4.8,
            priceRange: "$$$$",
            location: "Charminar area, Hyderabad",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800",
            description: "Premium cuts of aged beef cooked to perfection. Classic American dining with a sophisticated touch.",
            menu: [
                { name: "Ribeye Steak", price: 58 },
                { name: "Filet Mignon", price: 52 },
                { name: "Lobster Tail", price: 48 },
                { name: "Caesar Salad", price: 14 }
            ],
            reviews: [
                { user: "Thomas B.", rating: 5, comment: "Best steak I've ever had!" },
                { user: "Susan K.", rating: 5, comment: "Impeccable service and quality." },
                { user: "Daniel P.", rating: 5, comment: "A true steakhouse experience." }
            ],
            timeSlots: ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"],
            tables: 14
        }
    ],

    getAll() {
        return this.restaurants;
    },

    getById(id) {
        return this.restaurants.find(r => r.id === parseInt(id));
    },

    filter(filters) {
        let filtered = [...this.restaurants];

        if (filters.cuisine && filters.cuisine !== 'all') {
            filtered = filtered.filter(r => r.cuisine.toLowerCase() === filters.cuisine.toLowerCase());
        }

        if (filters.priceRange && filters.priceRange !== 'all') {
            filtered = filtered.filter(r => r.priceRange === filters.priceRange);
        }

        if (filters.rating) {
            filtered = filtered.filter(r => r.rating >= parseFloat(filters.rating));
        }

        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(r => 
                r.name.toLowerCase().includes(searchLower) ||
                r.cuisine.toLowerCase().includes(searchLower) ||
                r.location.toLowerCase().includes(searchLower)
            );
        }

        return filtered;
    },

    getCuisines() {
        return [...new Set(this.restaurants.map(r => r.cuisine))];
    }
};

// ============================================
// Reservation Management
// ============================================

const Reservations = {
    getAll() {
        return Storage.get('reservations') || [];
    },

    getByUserId(userId) {
        return this.getAll().filter(r => r.userId === userId);
    },

    getById(id) {
        return this.getAll().find(r => r.id === parseInt(id));
    },

    create(reservationData) {
        const reservations = this.getAll();
        const newReservation = {
            id: reservations.length + 1,
            ...reservationData,
            status: 'upcoming',
            createdAt: new Date().toISOString()
        };

        reservations.push(newReservation);
        Storage.set('reservations', reservations);
        
        return newReservation;
    },

    cancel(id) {
        const reservations = this.getAll();
        const index = reservations.findIndex(r => r.id === parseInt(id));
        
        if (index !== -1) {
            reservations[index].status = 'cancelled';
            Storage.set('reservations', reservations);
            return true;
        }
        
        return false;
    },

    updateStatus(id, status) {
        const reservations = this.getAll();
        const index = reservations.findIndex(r => r.id === parseInt(id));
        
        if (index !== -1) {
            reservations[index].status = status;
            Storage.set('reservations', reservations);
            return true;
        }
        
        return false;
    }
};

// ============================================
// UI Utilities
// ============================================

const UI = {
    // Add ripple effect to buttons
    addRippleEffect() {
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    },

    // Navbar scroll effect
    initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });
        }
    },

    // Mobile menu toggle
    initMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (toggle && navLinks) {
            toggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                toggle.classList.toggle('active');
            });

            // Close menu when clicking on a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    toggle.classList.remove('active');
                });
            });
        }
    },

    // Theme toggle
    initThemeToggle() {
        const toggle = document.querySelector('.theme-toggle');
        const currentTheme = Storage.get('theme') || 'light';
        
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        if (toggle) {
            toggle.addEventListener('click', () => {
                const theme = document.documentElement.getAttribute('data-theme');
                const newTheme = theme === 'light' ? 'dark' : 'light';
                
                document.documentElement.setAttribute('data-theme', newTheme);
                Storage.set('theme', newTheme);
            });
        }
    },

    // Loader
    showLoader() {
        const loader = document.querySelector('.loader-wrapper');
        if (loader) {
            loader.classList.remove('hidden');
        }
    },

    hideLoader() {
        const loader = document.querySelector('.loader-wrapper');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 500);
        }
    },

    // Skeleton loading
    showSkeleton(container, count = 6) {
        const skeletonHtml = Array(count).fill().map(() => `
            <div class="card">
                <div class="skeleton skeleton-image"></div>
                <div class="card-content">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text" style="width: 80%;"></div>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = skeletonHtml;
    },

    // Format date
    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    },

    // Format time
    formatTime(timeString) {
        return timeString;
    },

    // Generate star rating
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '★';
        }
        
        if (hasHalfStar) {
            stars += '☆';
        }
        
        return stars;
    },

    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Animate on scroll
    initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
};

// ============================================
// Form Validation
// ============================================

const Validator = {
    email(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    password(password) {
        return password.length >= 6;
    },

    phone(phone) {
        const re = /^[\d\s+()-]{10,}$/;
        return re.test(phone);
    },

    required(value) {
        return value.trim() !== '';
    },

    minLength(value, min) {
        return value.length >= min;
    },

    maxLength(value, max) {
        return value.length <= max;
    }
};

// ============================================
// Initialize on page load
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize authentication
    Auth.init();
    
    // Initialize UI components
    UI.addRippleEffect();
    UI.initNavbarScroll();
    UI.initMobileMenu();
    UI.initThemeToggle();
    UI.initScrollAnimations();
    
    // Hide loader after page load
    UI.hideLoader();
});

// Export for use in other files
window.Storage = Storage;
window.Auth = Auth;
window.Toast = Toast;
window.Modal = Modal;
window.RestaurantData = RestaurantData;
window.Reservations = Reservations;
window.UI = UI;
window.Validator = Validator;

