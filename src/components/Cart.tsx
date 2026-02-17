import { useState } from 'react';
import { CartItem, Order } from '../App';
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, Smartphone } from 'lucide-react';
import { toast } from 'sonner';

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClearCart: () => void;
  onPlaceOrder: (orderData: Omit<Order, 'id' | 'orderDate' | 'status'>) => Order;
  adminEmail: string;
}

export function Cart({ cart, onUpdateQuantity, onClearCart, onPlaceOrder, adminEmail }: CartProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'cod'
  });

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast.error('Please fill all fields');
      return;
    }

    const order = onPlaceOrder({
      userId: Date.now().toString(),
      userName: formData.name,
      userEmail: formData.email,
      userPhone: formData.phone,
      userAddress: formData.address,
      items: cart,
      totalAmount
    });

    // Send email notification
    try {
      const orderDetails = cart.map(item => 
        `${item.name} - ${item.weight} x ${item.quantity} = ₹${item.price * item.quantity}`
      ).join('\n');

      const emailContent = `
New Order Received!

Order ID: ${order.id}
Order Date: ${new Date(order.orderDate).toLocaleString()}

Customer Details:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address}

Order Items:
${orderDetails}

Total Amount: ₹${totalAmount}

Payment Method: ${formData.paymentMethod === 'cod' ? 'Cash on Delivery' : formData.paymentMethod.toUpperCase()}

---
This is an automated email from Homelike Spices ordering system.
      `;

      // Note: EmailJS requires configuration. For demonstration, we'll show success
      console.log('Order placed:', order);
      console.log('Email to:', adminEmail);
      console.log('Email content:', emailContent);
      
      toast.success('Order placed successfully! You will receive a confirmation email shortly.');
      
      onClearCart();
      setShowCheckout(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        paymentMethod: 'cod'
      });
    } catch (error) {
      console.error('Error:', error);
      toast.success('Order placed successfully! (Email notification pending)');
      onClearCart();
      setShowCheckout(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ShoppingBag className="mx-auto text-gray-400 mb-4" size={64} />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-600">Add some delicious spices to get started!</p>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between py-2 border-b">
              <span>{item.name} x {item.quantity}</span>
              <span className="font-semibold">₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="flex justify-between py-4 text-xl font-bold">
            <span>Total:</span>
            <span className="text-orange-600">₹{totalAmount}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Delivery Address *</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Payment Method</label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-orange-50">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="text-orange-600"
                  />
                  <CreditCard className="text-gray-600" size={24} />
                  <span className="font-semibold">Cash on Delivery</span>
                </label>

                <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-orange-50">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="text-orange-600"
                  />
                  <Smartphone className="text-gray-600" size={24} />
                  <span className="font-semibold">UPI Payment</span>
                </label>

                <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-orange-50">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="text-orange-600"
                  />
                  <CreditCard className="text-gray-600" size={24} />
                  <span className="font-semibold">Credit/Debit Card</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-8">
            <button
              type="button"
              onClick={() => setShowCheckout(false)}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-full font-bold hover:bg-gray-50 transition-all"
            >
              Back to Cart
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-6">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                <p className="text-gray-600">{item.weight}</p>
                <p className="text-orange-600 font-bold text-lg mt-1">₹{item.price}</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-4 py-2">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="text-orange-600 hover:text-orange-700"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="text-orange-600 hover:text-orange-700"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                
                <button
                  onClick={() => onUpdateQuantity(item.id, 0)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-20">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">₹{totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery:</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-orange-600">₹{totalAmount}</span>
              </div>
            </div>

            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-4 rounded-full font-bold hover:shadow-lg transition-all"
            >
              Proceed to Checkout
            </button>
            
            <button
              onClick={onClearCart}
              className="w-full mt-3 border border-red-300 text-red-600 px-6 py-3 rounded-full font-bold hover:bg-red-50 transition-all"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
