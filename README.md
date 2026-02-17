# 🌶️ Homelike Spices - Complete E-Commerce Platform

<div align="center">

![Homelike Spices](https://img.shields.io/badge/Homelike-Spices-orange?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern, full-featured e-commerce platform built specifically for startup spice brands**

[Live Demo](#-getting-started) | [Documentation](#-documentation) | [Features](#-features) | [Deploy](#-hosting--deployment)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Documentation](#-documentation)
- [Tech Stack](#-tech-stack)
- [Deployment](#-hosting--deployment)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

A production-ready, fully functional e-commerce website for **Homelike Spices** - a startup spices brand. This platform includes everything needed to run an online spice business, from product management to order processing, with zero monthly fees and complete control over your code.

## 🌟 Features

### Customer Features
- **Beautiful Landing Page**: Attractive hero section with brand showcase
- **Product Catalog**: Browse premium quality spices with detailed information
- **Shopping Cart**: Add items, adjust quantities, and manage orders
- **Order Placement**: Complete checkout with delivery details and payment options
- **Order Tracking**: Track order status with email and phone search
- **Multiple Payment Options**: Cash on Delivery, UPI, Credit/Debit Cards

### Admin Panel Features
- **Product Management**: Add, edit, delete products with images and pricing
- **Order Management**: View all orders with customer details
- **Order Status Updates**: Update order status (Pending → Processing → Shipped → Delivered)
- **Settings Management**: Configure admin email and store information
- **Inventory Control**: Manage stock status for each product

### Technical Features
- **Local Storage Database**: All data persists in browser localStorage
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Real-time Updates**: Instant UI updates with React state management
- **Email Notifications**: Order receipts sent to admin email (configurable)
- **Secure Admin Access**: Password-protected admin panel

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd homelike-spices
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## 🔐 Admin Access

- **Admin Panel Location**: Click the "Admin" button in the navigation
- **Default Password**: `admin123`
- **What you can do**:
  - Add/Edit/Delete products
  - View all orders
  - Update order status
  - Configure store settings

## 📦 Building for Production

Build the project for production:
```bash
npm run build
```

The built files will be in the `dist` folder.

## 🌐 Hosting & Deployment

### Option 1: Netlify (Recommended for Beginners)

1. **Sign Up**: Go to [netlify.com](https://www.netlify.com) and create an account

2. **Deploy from GitHub**:
   - Push your code to GitHub
   - In Netlify, click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Build settings (auto-detected):
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Custom Domain** (Optional):
   - Go to Site settings → Domain management
   - Add your custom domain (e.g., homelikespices.com)

4. **Your site is live!** 🎉

### Option 2: Vercel

1. **Sign Up**: Go to [vercel.com](https://vercel.com)

2. **Deploy**:
   - Install Vercel CLI: `npm i -g vercel`
   - Run: `vercel`
   - Follow the prompts

3. **Or deploy from GitHub**:
   - Import your repository
   - Vercel auto-detects Vite settings
   - Deploy!

### Option 3: GitHub Pages

1. **Install gh-pages**:
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**:
```json
{
  "homepage": "https://yourusername.github.io/homelike-spices",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Deploy**:
```bash
npm run deploy
```

### Option 4: Firebase Hosting

1. **Install Firebase CLI**:
```bash
npm install -g firebase-tools
```

2. **Login and Initialize**:
```bash
firebase login
firebase init hosting
```

3. **Configure**:
   - Public directory: `dist`
   - Single-page app: `Yes`
   - Set up automatic builds: `No`

4. **Build and Deploy**:
```bash
npm run build
firebase deploy
```

## 📧 Setting Up Email Notifications

To enable email notifications for orders:

1. **Sign up at [EmailJS](https://www.emailjs.com/)**

2. **Create an Email Service**:
   - Gmail, Outlook, or custom SMTP
   - Get your Service ID

3. **Create Email Template**:
   - Create a template for order notifications
   - Get your Template ID

4. **Get Your Public Key** from Account settings

5. **Update the code** in `src/components/Cart.tsx`:
```typescript
// Replace the email sending section with:
emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  {
    to_email: adminEmail,
    order_id: order.id,
    customer_name: formData.name,
    customer_email: formData.email,
    order_details: orderDetails,
    total_amount: totalAmount
  },
  'YOUR_PUBLIC_KEY'
);
```

## 🗄️ Database Setup (Optional Advanced Feature)

Currently, the app uses localStorage. To add a real database:

### Option A: Firebase Firestore

1. **Create Firebase Project**: [console.firebase.google.com](https://console.firebase.google.com)

2. **Enable Firestore Database**

3. **Install Firebase**:
```bash
npm install firebase
```

4. **Create `src/firebase.ts`**:
```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

5. **Replace localStorage calls** with Firestore operations

### Option B: Supabase

1. **Create Project**: [supabase.com](https://supabase.com)

2. **Install Supabase**:
```bash
npm install @supabase/supabase-js
```

3. **Follow Supabase documentation** to set up tables and queries

## 🎨 Customization

### Change Colors
Edit the Tailwind classes in components:
- Primary color: `orange-600` → your color
- Secondary color: `red-600` → your color

### Change Logo
Replace the logo in the navigation bar in `src/App.tsx`

### Add More Products
Use the Admin Panel to add products, or edit the default products in `src/App.tsx`

## 📱 Features Breakdown

### Data Storage
- **Products**: Stored in localStorage (`homelike_products`)
- **Cart**: Stored in localStorage (`homelike_cart`)
- **Orders**: Stored in localStorage (`homelike_orders`)
- **Settings**: Stored in localStorage (`homelike_settings`)

### User Flow
1. Customer browses products on Shop page
2. Adds items to cart
3. Proceeds to checkout
4. Fills delivery details and payment method
5. Places order
6. Order sent to admin email
7. Customer can track order status

### Admin Flow
1. Admin logs in with password
2. Manages products (add/edit/delete)
3. Views all orders
4. Updates order status
5. Configures store settings

## 🔧 Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Site Not Loading After Deploy
- Check build logs for errors
- Ensure `dist` folder is being deployed
- Check for routing issues (use hash routing for static hosts)

### Images Not Showing
- Use absolute URLs for product images
- Consider using a CDN like Cloudinary or ImgBB

## 📄 License

This project is open source and available for use.

## 🤝 Support

For issues or questions:
1. Check the code comments
2. Review this README
3. Check browser console for errors

## 🎯 Roadmap

Future enhancements:
- [ ] User authentication
- [ ] Product reviews and ratings
- [ ] Wishlist feature
- [ ] Payment gateway integration
- [ ] Order invoice PDF generation
- [ ] SMS notifications
- [ ] Real-time inventory management
- [ ] Analytics dashboard
- [ ] Discount codes/coupons
- [ ] Multi-language support

## 💡 Tips for Success

1. **Start Simple**: Use the default localStorage setup initially
2. **Test Thoroughly**: Test all features before deploying
3. **Backup Data**: Export localStorage data regularly
4. **Monitor Orders**: Check admin email regularly
5. **Update Products**: Keep product images and info current
6. **Customer Service**: Respond to orders promptly
7. **Marketing**: Share your website link on social media

## 🌟 Making It Your Own

This is a startup-ready template. Customize it:
- Change brand name and colors
- Add your product photos
- Update contact information
- Add your business policies
- Create social media links
- Add customer testimonials
- Create blog/recipe section

---

**Built with ❤️ for Homelike Spices**

Happy Selling! 🌶️
