# Technical Documentation - Homelike Spices E-Commerce Platform

## 🏗️ Architecture Overview

### Tech Stack
- **Frontend Framework**: React 19.2.3 with TypeScript
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.17
- **State Management**: React Hooks (useState, useEffect)
- **Data Persistence**: Browser localStorage
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Email**: EmailJS (optional)

### Project Structure
```
src/
├── components/
│   ├── Home.tsx           # Landing page
│   ├── ProductList.tsx    # Product catalog
│   ├── Cart.tsx           # Shopping cart & checkout
│   ├── AdminPanel.tsx     # Admin dashboard
│   └── UserOrders.tsx     # Order tracking
├── utils/
│   └── cn.ts             # Tailwind class merger
├── App.tsx               # Main application logic
├── main.tsx              # React entry point
└── index.css             # Global styles
```

## 📦 Data Models

### Product Interface
```typescript
interface Product {
  id: string;              // Unique identifier (timestamp)
  name: string;            // Product name
  price: number;           // Price in rupees
  image: string;           // Image URL
  description: string;     // Product description
  weight: string;          // Package weight (e.g., "100g")
  inStock: boolean;        // Availability status
}
```

### CartItem Interface
```typescript
interface CartItem extends Product {
  quantity: number;        // Number of items in cart
}
```

### Order Interface
```typescript
interface Order {
  id: string;              // Unique order ID
  userId: string;          // Customer ID (timestamp)
  userName: string;        // Customer name
  userEmail: string;       // Customer email
  userPhone: string;       // Customer phone
  userAddress: string;     // Delivery address
  items: CartItem[];       // Order items
  totalAmount: number;     // Total order value
  orderDate: string;       // ISO timestamp
  status: string;          // Order status
}
```

### AdminSettings Interface
```typescript
interface AdminSettings {
  email: string;           // Admin email for notifications
  storeName: string;       // Store name
  storeDescription: string; // Store description
}
```

## 💾 Data Storage

### localStorage Keys
- `homelike_products`: Product catalog (JSON array)
- `homelike_cart`: Shopping cart items (JSON array)
- `homelike_orders`: All orders (JSON array)
- `homelike_settings`: Admin settings (JSON object)

### Data Flow
1. **Initialize**: Load from localStorage on mount
2. **Update**: Modify state with React hooks
3. **Persist**: Save to localStorage via useEffect
4. **Read**: Access from state, not localStorage directly

### Example Data Operations
```typescript
// Load
useEffect(() => {
  const saved = localStorage.getItem('homelike_products');
  if (saved) setProducts(JSON.parse(saved));
}, []);

// Save
useEffect(() => {
  localStorage.setItem('homelike_products', JSON.stringify(products));
}, [products]);
```

## 🔐 Security Considerations

### Current Implementation
- **Admin Auth**: Simple password check (`admin123`)
- **Data Storage**: Client-side only (localStorage)
- **No Server**: Static site, no backend

### Limitations
- Admin password visible in source code
- No user authentication
- Data not synced across devices
- No server-side validation

### Recommended Improvements
1. **Authentication**: Implement Firebase Auth or similar
2. **Backend**: Add Node.js/Express server
3. **Database**: Migrate to Firestore, MongoDB, or PostgreSQL
4. **Password**: Hash admin password, use JWT tokens
5. **Validation**: Server-side input validation
6. **HTTPS**: Always use HTTPS in production

## 🎨 UI/UX Design

### Color Scheme
- **Primary**: Orange (orange-600, orange-500)
- **Secondary**: Red (red-600, red-500)
- **Accent**: Amber, Yellow tones
- **Neutral**: Gray scale

### Responsive Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

### Component Patterns
- **Cards**: Rounded corners (rounded-2xl), shadow-lg
- **Buttons**: Rounded-full, gradient backgrounds
- **Forms**: Border focus states, ring-2
- **Navigation**: Sticky header, active states

## 🔧 Key Features Implementation

### 1. Product Management
**Location**: `AdminPanel.tsx`

```typescript
// Add product
const handleAddProduct = (e: React.FormEvent) => {
  const newProduct: Product = {
    id: Date.now().toString(),
    name: productForm.name,
    price: parseFloat(productForm.price),
    image: productForm.image,
    description: productForm.description,
    weight: productForm.weight,
    inStock: productForm.inStock
  };
  setProducts([...products, newProduct]);
};

// Edit product
const handleEditProduct = (e: React.FormEvent) => {
  const updatedProducts = products.map(p =>
    p.id === editingProduct.id ? { ...p, ...updates } : p
  );
  setProducts(updatedProducts);
};

// Delete product
const handleDeleteProduct = (id: string) => {
  setProducts(products.filter(p => p.id !== id));
};
```

### 2. Shopping Cart
**Location**: `Cart.tsx`

```typescript
// Add to cart
const addToCart = (product: Product) => {
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    setCart(cart.map(item =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  } else {
    setCart([...cart, { ...product, quantity: 1 }]);
  }
};

// Update quantity
const updateCartQuantity = (productId: string, quantity: number) => {
  if (quantity === 0) {
    setCart(cart.filter(item => item.id !== productId));
  } else {
    setCart(cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ));
  }
};
```

### 3. Order Processing
**Location**: `Cart.tsx`

```typescript
const placeOrder = (orderData: Omit<Order, 'id' | 'orderDate' | 'status'>) => {
  const newOrder: Order = {
    ...orderData,
    id: Date.now().toString(),
    orderDate: new Date().toISOString(),
    status: 'Pending'
  };
  setOrders([...orders, newOrder]);
  return newOrder;
};
```

### 4. Order Status Updates
**Location**: `AdminPanel.tsx`

```typescript
const updateOrderStatus = (orderId: string, status: string) => {
  setOrders(orders.map(order =>
    order.id === orderId ? { ...order, status } : order
  ));
};
```

## 📧 Email Integration

### Using EmailJS

1. **Install Package**:
```bash
npm install @emailjs/browser
```

2. **Import**:
```typescript
import emailjs from '@emailjs/browser';
```

3. **Send Email**:
```typescript
emailjs.send(
  'service_id',
  'template_id',
  {
    to_email: adminEmail,
    order_id: order.id,
    customer_name: formData.name,
    customer_email: formData.email,
    order_details: orderDetails,
    total_amount: totalAmount
  },
  'public_key'
).then(
  (result) => console.log('Email sent:', result.text),
  (error) => console.log('Email error:', error.text)
);
```

### Email Template Variables
- `{{to_email}}`: Admin email
- `{{order_id}}`: Order ID
- `{{customer_name}}`: Customer name
- `{{customer_email}}`: Customer email
- `{{order_details}}`: Order items list
- `{{total_amount}}`: Total amount

## 🗄️ Database Migration Guide

### From localStorage to Firebase Firestore

1. **Install Firebase**:
```bash
npm install firebase
```

2. **Initialize Firebase** (`src/firebase.ts`):
```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

3. **Replace localStorage Operations**:

**Read Products**:
```typescript
import { collection, getDocs } from 'firebase/firestore';

const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(db, 'products'));
  const products = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  setProducts(products);
};
```

**Add Product**:
```typescript
import { addDoc, collection } from 'firebase/firestore';

const addProduct = async (product: Omit<Product, 'id'>) => {
  const docRef = await addDoc(collection(db, 'products'), product);
  return { id: docRef.id, ...product };
};
```

**Update Product**:
```typescript
import { doc, updateDoc } from 'firebase/firestore';

const updateProduct = async (id: string, updates: Partial<Product>) => {
  const docRef = doc(db, 'products', id);
  await updateDoc(docRef, updates);
};
```

**Delete Product**:
```typescript
import { doc, deleteDoc } from 'firebase/firestore';

const deleteProduct = async (id: string) => {
  await deleteDoc(doc(db, 'products', id));
};
```

## 🚀 Performance Optimization

### Current Optimizations
- Vite for fast builds
- Code splitting (dynamic imports)
- Single file build (vite-plugin-singlefile)
- Tailwind CSS purging

### Recommended Improvements
1. **Image Optimization**:
   - Use WebP format
   - Implement lazy loading
   - Use CDN (Cloudinary, ImgIX)

2. **Code Splitting**:
```typescript
const AdminPanel = lazy(() => import('./components/AdminPanel'));
```

3. **Memoization**:
```typescript
const filteredProducts = useMemo(() => 
  products.filter(p => p.inStock),
  [products]
);
```

4. **Debouncing Search**:
```typescript
import { useDebounce } from 'use-debounce';
const [debouncedSearch] = useDebounce(searchTerm, 300);
```

## 🧪 Testing

### Recommended Testing Strategy

1. **Unit Tests** (Jest + React Testing Library):
```typescript
import { render, screen } from '@testing-library/react';
import { ProductList } from './components/ProductList';

test('displays products', () => {
  const products = [{ id: '1', name: 'Turmeric', ... }];
  render(<ProductList products={products} onAddToCart={jest.fn()} />);
  expect(screen.getByText('Turmeric')).toBeInTheDocument();
});
```

2. **Integration Tests**:
   - Test cart flow
   - Test checkout process
   - Test admin panel

3. **E2E Tests** (Cypress or Playwright):
```typescript
describe('Checkout Flow', () => {
  it('completes an order', () => {
    cy.visit('/');
    cy.contains('Shop').click();
    cy.contains('Add to Cart').first().click();
    cy.contains('Cart').click();
    cy.contains('Proceed to Checkout').click();
    // ... fill form and submit
  });
});
```

## 📱 Mobile Considerations

### Current Mobile Features
- Responsive navigation
- Touch-friendly buttons
- Mobile-optimized forms
- Responsive grid layouts

### Recommendations
1. **PWA Support**: Add service worker
2. **Touch Gestures**: Swipe for navigation
3. **Mobile Payment**: Integrate UPI deep links
4. **Native App**: Consider React Native version

## 🔄 State Management Alternatives

### Current: React Hooks
Suitable for small to medium apps.

### For Scaling:

**Context API**:
```typescript
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  
  return (
    <AppContext.Provider value={{ products, cart, setProducts, setCart }}>
      {children}
    </AppContext.Provider>
  );
}
```

**Redux Toolkit**:
```typescript
import { configureStore, createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
  },
});
```

**Zustand** (Recommended for simplicity):
```typescript
import create from 'zustand';

const useStore = create((set) => ({
  products: [],
  addProduct: (product) => set((state) => ({
    products: [...state.products, product]
  })),
}));
```

## 🔌 API Integration

### Payment Gateway (Razorpay Example)

1. **Install**:
```bash
npm install razorpay
```

2. **Frontend**:
```typescript
const handlePayment = async () => {
  const options = {
    key: 'YOUR_KEY_ID',
    amount: totalAmount * 100, // Amount in paise
    currency: 'INR',
    name: 'Homelike Spices',
    description: 'Order Payment',
    handler: function (response) {
      // Payment successful
      console.log(response.razorpay_payment_id);
    },
  };
  
  const rzp = new window.Razorpay(options);
  rzp.open();
};
```

3. **Backend Verification** (Node.js):
```javascript
const crypto = require('crypto');

app.post('/verify-payment', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
  const generated_signature = crypto
    .createHmac('sha256', 'YOUR_KEY_SECRET')
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');
  
  if (generated_signature === razorpay_signature) {
    // Payment verified
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});
```

## 🛠️ Development Workflow

### Local Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Code Quality
```bash
npm install -D eslint prettier
npm install -D @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### Git Workflow
```bash
git checkout -b feature/new-feature
# Make changes
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
# Create pull request
```

## 📊 Analytics Integration

### Google Analytics 4

1. **Install**:
```bash
npm install react-ga4
```

2. **Initialize** (`src/main.tsx`):
```typescript
import ReactGA from 'react-ga4';

ReactGA.initialize('G-XXXXXXXXXX');
```

3. **Track Page Views**:
```typescript
useEffect(() => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
}, []);
```

4. **Track Events**:
```typescript
const trackAddToCart = (product: Product) => {
  ReactGA.event({
    category: 'Ecommerce',
    action: 'Add to Cart',
    label: product.name,
    value: product.price
  });
};
```

## 🐛 Common Issues & Solutions

### Issue: Build fails with type errors
**Solution**: Run `npm run build` and fix TypeScript errors

### Issue: localStorage quota exceeded
**Solution**: Implement data cleanup or migrate to database

### Issue: Images not loading
**Solution**: Use absolute URLs, check CORS, verify image URLs

### Issue: Slow performance with many products
**Solution**: Implement pagination or virtual scrolling

## 📚 Resources

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [Firebase Docs](https://firebase.google.com/docs)

---

**Happy Coding! 🚀**
