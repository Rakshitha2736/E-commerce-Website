# Zentro E-Commerce Website

A full-stack e-commerce web application with React frontend and Node.js/Express backend, connected to MongoDB. Features include user authentication, item management, category-based navigation, and admin panel.

## ✨ Features

- **🎨 Beautiful UI**: Modern, responsive design with gradient themes
- **🔐 User Authentication**: Signup and login system with MongoDB storage
- **🛍️ Item Management**: Add items with categories, subcategories, images, and pricing
- **🛒 Shopping Cart**: Full cart functionality with quantity management and order summary
- **📱 Responsive Design**: Works on all devices with modern UI components
- **👑 Admin Panel**: Exclusive admin access for user and item management
- **📊 Real-time Data**: Live updates from MongoDB database
- **🎯 Category Navigation**: Dropdown menus for Men, Women, Kids, Beauty, Electronics

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn

### 1. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Start MongoDB

Make sure MongoDB is running on your system:
```bash
# If using MongoDB locally
mongod
```

### 3. Create Admin User & Add Dummy Items

```bash
cd server
npm run create-admin
npm run add-dummy-items
```

This creates:
- **Admin User**: Rakshitha_006 / Raks@06
- **Dummy Items**: 25+ items across all categories with images

### 4. Run the Application

#### Terminal 1 - Start the Server
```bash
cd server
npm start
```

#### Terminal 2 - Start the Client
```bash
cd client
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 🔄 Application Flow

1. **Logo Page** (`/`) - Landing page with Zentro branding
2. **Click "Go to Website"** - Directly navigates to signup page
3. **Signup/Login** - User authentication
4. **Main App** (`/app`) - E-commerce dashboard with navigation and shopping
5. **Shopping Cart** (`/cart`) - View and manage cart items
6. **Admin Panel** (`/admin`) - Only visible to admin user

## 🎯 Navigation Categories

### Men
- Pant, Shirt, T-Shirt, Jeans, Shoes

### Women  
- Dress, Top, Jeans, Shoes, Handbag

### Kids
- Clothing, Toys, Shoes, Accessories

### Beauty
- Makeup, Skincare, Haircare, Fragrance

### Electronics
- Mobile, Laptop, Headphones, Camera

## 🛒 Shopping Cart Features

### Add to Cart
- Click "🛒 Add to Cart" button on any item
- Items are automatically added to your cart
- Cart count is displayed in the navigation bar
- Cart data persists in localStorage

### Cart Management
- **View Cart**: Click the Cart button in navigation to go to `/cart`
- **Quantity Control**: Increase/decrease item quantities with +/- buttons
- **Remove Items**: Remove individual items or clear entire cart
- **Order Summary**: See total cost, shipping, and tax breakdown
- **Checkout**: Proceed to checkout (placeholder for future implementation)

### Cart Persistence
- Cart items are saved in browser localStorage
- Cart persists across browser sessions
- Cart is cleared when user logs out

## 🚀 Buy Now Features

### Instant Purchase
- Click "🚀 Buy Now" button on any item for immediate checkout
- Bypass cart for single-item purchases
- Direct payment processing

### Payment Options
- **💳 Credit/Debit Card**: Secure card payment
- **💰 Cash on Delivery**: Pay when item arrives
- **📱 UPI Payment**: 
  - Google Pay integration
  - PhonePe integration
  - Real-time payment processing

### Delivery Information
- **Electronics**: 5 days delivery
- **Beauty Products**: 2 days delivery
- **Other Items**: 3 days delivery
- Order confirmation with delivery timeline

## 📦 Stock Management

### Stock Status Indicators
- **🟢 In Stock**: Items with quantity > 5
- **🟡 Low Stock**: Items with quantity ≤ 5
- **🔴 Out of Stock**: Items with quantity = 0

### Out-of-Stock Features
- Items with zero quantity show "Out of Stock" warning
- Add to Cart and Buy Now buttons are disabled for unavailable items
- Clear visual indicators prevent customer confusion
- Admin can easily restock items using quantity controls

### Admin Quantity Controls
- **Quick +/- Buttons**: Increase/decrease by 1
- **Edit Quantity**: Direct input for bulk updates
- **Real-time Updates**: Changes reflect immediately
- **Validation**: Prevents negative quantities

## 📝 Add Item Form

The "Add Item" functionality includes:
- **Item Name** (required)
- **Quantity** (required)
- **Image URL** (optional)
- **Cost** in ₹ (required)
- **Contact Number** (required)
- **Category** selection (required)
- **Subcategory** selection (dynamic based on category)

## 👑 Admin Panel

-### Access Requirements
- Only accessible to user with username: `Rakshitha_006`
- Automatically hidden for non-admin users

### Features
- **User Management**: View all registered users with roles
- **Item Management**: View all items with detailed information
- **Quantity Management**: 
  - Increase/decrease item quantities with +/- buttons
  - Quick quantity edit with prompt input
  - Real-time quantity updates
  - Stock status indicators (In Stock, Low Stock, Out of Stock)
- **Statistics Dashboard**: 
  - Total Users
  - Total Items
  - Total Quantity
  - Total Value

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String (required),
  password: String (required)
}
```

### Item Model
```javascript
{
  name: String (required),
  quantity: Number (required, min: 1),
  image: String (optional),
  cost: Number (required, min: 0),
  contactNumber: String (required),
  category: String (required, enum),
  subcategory: String (optional),
  createdAt: Date (auto-generated)
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/users` - Get all users (admin only)

### Items
- `GET /items` - Get all items
- `POST /items` - Create new item

### Routes
- `/` - Logo/Landing page
- `/login` - User login
- `/signup` - User registration
- `/app` - Main e-commerce dashboard
- `/cart` - Shopping cart page
- `/admin` - Admin panel (admin only)

## 🛠️ Technologies Used

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB
- **Styling**: CSS with modern design patterns
- **State Management**: React Hooks
- **Authentication**: Local storage based

## 🔧 Customization

### Adding New Categories
Edit the `categories` object in `MainApp.js`:
```javascript
const categories = {
  men: ["Pant", "Shirt", "T-Shirt", "Jeans", "Shoes"],
  women: ["Dress", "Top", "Jeans", "Shoes", "Handbag"],
  // Add new categories here
  newCategory: ["Sub1", "Sub2", "Sub3"]
};
```

### Changing Admin Username
Update the admin check in `MainApp.js` and `AdminPanel.js`:
```javascript
// example: check stored username against your admin username
setIsAdmin(username === "Rakshitha_006");
```

## 🚨 Security Notes

- Admin access is controlled by username verification
- Passwords are stored as plain text (consider bcrypt for production)
- No session management (consider JWT for production)

## 📱 Responsive Features

- Mobile-friendly navigation
- Responsive grid layouts
- Touch-friendly buttons and forms
- Adaptive dropdown menus

## 🎨 UI Components

- **Glassmorphism Cards**: Modern translucent design
- **Gradient Backgrounds**: Beautiful color schemes
- **Hover Animations**: Smooth interactive effects
- **Modal Forms**: Clean item addition interface
- **Data Tables**: Organized admin information display

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in server.js

2. **Admin Panel Not Visible**
  - Verify admin username is correct
  - Check localStorage for `username`

3. **Items Not Loading**
   - Check server is running on port 5000
   - Verify MongoDB connection

### Debug Commands

```bash
# Check MongoDB status
mongosh

# View server logs
cd server && npm start

# View client logs  
cd client && npm start
```

## 📈 Future Enhancements

- [x] Shopping cart functionality ✅
- [ ] Payment integration (partially implemented)
- [ ] User profiles and preferences
- [ ] Search and filtering
- [ ] Order management
- [ ] Email notifications
- [ ] Image upload to cloud storage
- [ ] Advanced admin features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ for Zentro E-Commerce**
