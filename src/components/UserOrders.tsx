import { useState } from 'react';
import { Order } from '../App';
import { Package, Search } from 'lucide-react';

interface UserOrdersProps {
  orders: Order[];
}

export function UserOrders({ orders }: UserOrdersProps) {
  const [searchEmail, setSearchEmail] = useState('');
  const [searchPhone, setSearchPhone] = useState('');

  const filteredOrders = orders.filter(order => {
    const emailMatch = searchEmail === '' || order.userEmail.toLowerCase().includes(searchEmail.toLowerCase());
    const phoneMatch = searchPhone === '' || order.userPhone.includes(searchPhone);
    return emailMatch && phoneMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Track Your Orders</h1>

      {/* Search Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Search Your Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
            <div className="relative">
              <input
                type="tel"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <Package className="mx-auto text-gray-400 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            {searchEmail || searchPhone ? 'No Orders Found' : 'No Orders Yet'}
          </h2>
          <p className="text-gray-600">
            {searchEmail || searchPhone 
              ? 'Try different search criteria'
              : 'Your orders will appear here after you place them'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-6 border-b">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Order #{order.id}</h3>
                  <p className="text-gray-600">
                    Placed on {new Date(order.orderDate).toLocaleDateString()} at{' '}
                    {new Date(order.orderDate).toLocaleTimeString()}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <span
                    className={`px-6 py-2 rounded-full font-bold text-sm ${
                      order.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : order.status === 'Processing'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'Shipped'
                        ? 'bg-purple-100 text-purple-800'
                        : order.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Delivery Information</h4>
                  <div className="space-y-1 text-gray-600">
                    <p><span className="font-semibold">Name:</span> {order.userName}</p>
                    <p><span className="font-semibold">Email:</span> {order.userEmail}</p>
                    <p><span className="font-semibold">Phone:</span> {order.userPhone}</p>
                    <p><span className="font-semibold">Address:</span> {order.userAddress}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-800 mb-3">Order Summary</h4>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-gray-600">
                        <span>
                          {item.name} ({item.weight}) x {item.quantity}
                        </span>
                        <span className="font-semibold">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-orange-600">₹{order.totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Status Timeline */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-800 mb-4">Order Status</h4>
                <div className="flex items-center justify-between relative">
                  <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
                    <div
                      className="h-full bg-gradient-to-r from-orange-600 to-red-600 transition-all"
                      style={{
                        width:
                          order.status === 'Pending'
                            ? '0%'
                            : order.status === 'Processing'
                            ? '33%'
                            : order.status === 'Shipped'
                            ? '66%'
                            : order.status === 'Delivered'
                            ? '100%'
                            : '0%'
                      }}
                    ></div>
                  </div>

                  {['Pending', 'Processing', 'Shipped', 'Delivered'].map((status, index) => {
                    const isActive = 
                      order.status === status ||
                      (order.status === 'Processing' && index === 0) ||
                      (order.status === 'Shipped' && index <= 1) ||
                      (order.status === 'Delivered' && index <= 2);

                    return (
                      <div key={status} className="flex flex-col items-center z-10">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                            isActive
                              ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white'
                              : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          {index + 1}
                        </div>
                        <span
                          className={`mt-2 text-xs font-semibold ${
                            isActive ? 'text-orange-600' : 'text-gray-500'
                          }`}
                        >
                          {status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
