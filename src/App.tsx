import { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { AdminPanel } from './components/AdminPanel';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { UserOrders } from './components/UserOrders';
import { Toaster, toast } from 'sonner';
import { ShoppingCart, User, Home as HomeIcon, Shield } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  weight: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  items: CartItem[];
  totalAmount: number;
  orderDate: string;
  status: string;
}

export interface AdminSettings {
  email: string;
  storeName: string;
  storeDescription: string;
}

export function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'shop' | 'cart' | 'admin' | 'orders'>('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [adminSettings, setAdminSettings] = useState<AdminSettings>({
    email: 'admin@homelikespices.com',
    storeName: 'Homelike Spices',
    storeDescription: 'Premium Quality Spices for Your Home'
  });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('homelike_products');
    const savedCart = localStorage.getItem('homelike_cart');
    const savedOrders = localStorage.getItem('homelike_orders');
    const savedSettings = localStorage.getItem('homelike_settings');

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Default products for startup
      const defaultProducts: Product[] = [
        {
          id: '1',
          name: 'Premium Turmeric Powder',
          price: 299,
          image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc743?w=500',
          description: 'Pure and organic turmeric powder with high curcumin content',
          weight: '100g',
          inStock: true
        },
        {
          id: '2',
          name: 'Red Chili Powder',
          price: 199,
          image: 'https://images.unsplash.com/photo-1583997052301-0042b33fc598?w=500',
          description: 'Authentic red chili powder for perfect spice level',
          weight: '100g',
          inStock: true
        },
        {
          id: '3',
          name: 'Garam Masala',
          price: 349,
          image: 'https://images.unsplash.com/photo-1596040033229-a0b3b83ec15c?w=500',
          description: 'Traditional blend of aromatic spices',
          weight: '100g',
          inStock: true
        },
        {
          id: '4',
          name: 'Cumin Seeds',
          price: 249,
          image: 'https://images.unsplash.com/photo-1596040033229-a0b3b83ec15c?w=500',
          description: 'Fresh and aromatic cumin seeds',
          weight: '100g',
          inStock: true
        }
      ];
      setProducts(defaultProducts);
      localStorage.setItem('homelike_products', JSON.stringify(defaultProducts));
    }

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedSettings) setAdminSettings(JSON.parse(savedSettings));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('homelike_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('homelike_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('homelike_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('homelike_settings', JSON.stringify(adminSettings));
  }, [adminSettings]);

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
    toast.success('Added to cart!');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

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

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <Toaster position="top-right" richColors />
      
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                  Homelike Spices
                </h1>
                <p className="text-xs text-gray-600">Premium Quality Spices</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage('home')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'home'
                    ? 'bg-orange-100 text-orange-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <HomeIcon size={20} />
                <span className="hidden sm:inline">Home</span>
              </button>
              
              <button
                onClick={() => setCurrentPage('shop')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'shop'
                    ? 'bg-orange-100 text-orange-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="hidden sm:inline">Shop</span>
                <span className="sm:hidden">Products</span>
              </button>
              
              <button
                onClick={() => setCurrentPage('orders')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'orders'
                    ? 'bg-orange-100 text-orange-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User size={20} />
                <span className="hidden sm:inline">My Orders</span>
              </button>
              
              <button
                onClick={() => setCurrentPage('cart')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all relative ${
                  currentPage === 'cart'
                    ? 'bg-orange-100 text-orange-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <ShoppingCart size={20} />
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => {
                  if (isAdminLoggedIn) {
                    setCurrentPage('admin');
                  } else {
                    const password = prompt('Enter admin password:');
                    if (password === 'admin123') {
                      setIsAdminLoggedIn(true);
                      setCurrentPage('admin');
                      toast.success('Admin logged in!');
                    } else {
                      toast.error('Invalid password!');
                    }
                  }
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'admin'
                    ? 'bg-orange-100 text-orange-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Shield size={20} />
                <span className="hidden sm:inline">Admin</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {currentPage === 'home' && (
          <Home onShopNow={() => setCurrentPage('shop')} />
        )}
        
        {currentPage === 'shop' && (
          <ProductList products={products} onAddToCart={addToCart} />
        )}
        
        {currentPage === 'cart' && (
          <Cart
            cart={cart}
            onUpdateQuantity={updateCartQuantity}
            onClearCart={clearCart}
            onPlaceOrder={placeOrder}
            adminEmail={adminSettings.email}
          />
        )}
        
        {currentPage === 'admin' && isAdminLoggedIn && (
          <AdminPanel
            products={products}
            setProducts={setProducts}
            orders={orders}
            setOrders={setOrders}
            adminSettings={adminSettings}
            setAdminSettings={setAdminSettings}
          />
        )}
        
        {currentPage === 'orders' && (
          <UserOrders orders={orders} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-600 to-red-600 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Homelike Spices</h3>
              <p className="text-orange-100">
                Premium quality spices for your home. Fresh, authentic, and delivered with care.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-orange-100">
                <li><button onClick={() => setCurrentPage('home')} className="hover:text-white">Home</button></li>
                <li><button onClick={() => setCurrentPage('shop')} className="hover:text-white">Shop</button></li>
                <li><button onClick={() => setCurrentPage('orders')} className="hover:text-white">My Orders</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-orange-100">Email: {adminSettings.email}</p>
              <p className="text-orange-100 mt-2">Phone: +91 1234567890</p>
            </div>
          </div>
          <div className="border-t border-orange-400 mt-8 pt-8 text-center text-orange-100">
            <p>&copy; 2024 Homelike Spices. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
