import { useState } from 'react';
import { Product, Order, AdminSettings } from '../App';
import { Plus, Trash2, Edit, Package, ShoppingBag, Settings, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AdminPanelProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  adminSettings: AdminSettings;
  setAdminSettings: (settings: AdminSettings) => void;
}

export function AdminPanel({
  products,
  setProducts,
  orders,
  setOrders,
  adminSettings,
  setAdminSettings
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'settings'>('products');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    weight: '',
    inStock: true
  });
  const [imagePreview, setImagePreview] = useState<string>('');

  const resetForm = () => {
    setProductForm({
      name: '',
      price: '',
      image: '',
      description: '',
      weight: '',
      inStock: true
    });
    setEditingProduct(null);
    setImagePreview('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProductForm({ ...productForm, image: base64String });
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productForm.image) {
      toast.error('Please upload a product image');
      return;
    }

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
    toast.success('Product added successfully!');
    resetForm();
    setShowAddProduct(false);
  };

  const handleEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingProduct) return;

    const updatedProducts = products.map(p =>
      p.id === editingProduct.id
        ? {
            ...p,
            name: productForm.name,
            price: parseFloat(productForm.price),
            image: productForm.image,
            description: productForm.description,
            weight: productForm.weight,
            inStock: productForm.inStock
          }
        : p
    );

    setProducts(updatedProducts);
    toast.success('Product updated successfully!');
    resetForm();
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      toast.success('Product deleted successfully!');
    }
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      image: product.image,
      description: product.description,
      weight: product.weight,
      inStock: product.inStock
    });
    setImagePreview(product.image);
    setShowAddProduct(true);
  };

  const updateOrderStatus = (orderId: string, status: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    ));
    toast.success('Order status updated!');
  };

  const handleSettingsUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings updated successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Panel</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8 border-b">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-3 font-semibold transition-all ${
            activeTab === 'products'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Package size={20} />
            <span>Products</span>
          </div>
        </button>
        
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-3 font-semibold transition-all ${
            activeTab === 'orders'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <div className="flex items-center space-x-2">
            <ShoppingBag size={20} />
            <span>Orders ({orders.length})</span>
          </div>
        </button>
        
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-6 py-3 font-semibold transition-all ${
            activeTab === 'settings'
              ? 'text-orange-600 border-b-2 border-orange-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Settings size={20} />
            <span>Settings</span>
          </div>
        </button>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Manage Products</h2>
            <button
              onClick={() => {
                resetForm();
                setShowAddProduct(true);
              }}
              className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Add Product</span>
            </button>
          </div>

          {showAddProduct && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h3 className="text-xl font-bold mb-6">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <form onSubmit={editingProduct ? handleEditProduct : handleAddProduct} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Product Name *</label>
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Price (₹) *</label>
                    <input
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-gray-700 font-semibold mb-2">Product Image *</label>
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                      />
                      {imagePreview && (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setProductForm({ ...productForm, image: '' });
                              setImagePreview('');
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                      <p className="text-sm text-gray-600">
                        Upload an image (JPG, PNG, GIF - Max 5MB)
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Weight *</label>
                    <input
                      type="text"
                      value={productForm.weight}
                      onChange={(e) => setProductForm({ ...productForm, weight: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                      placeholder="e.g., 100g, 250g"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Description *</label>
                  <textarea
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={productForm.inStock}
                    onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                    className="w-5 h-5 text-orange-600"
                  />
                  <label className="text-gray-700 font-semibold">In Stock</label>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setShowAddProduct(false);
                    }}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-full font-bold hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all"
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  <p className="text-orange-600 font-bold mb-1">₹{product.price}</p>
                  <p className="text-gray-600 text-sm mb-3">Weight: {product.weight}</p>
                  <div className="flex items-center space-x-2 mb-4">
                    {product.inStock ? (
                      <>
                        <CheckCircle size={16} className="text-green-600" />
                        <span className="text-green-600 text-sm font-semibold">In Stock</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={16} className="text-red-600" />
                        <span className="text-red-600 text-sm font-semibold">Out of Stock</span>
                      </>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEdit(product)}
                      className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center space-x-2"
                    >
                      <Edit size={16} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all flex items-center justify-center space-x-2"
                    >
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>
          
          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <ShoppingBag className="mx-auto text-gray-400 mb-4" size={64} />
              <h3 className="text-xl font-bold text-gray-700 mb-2">No Orders Yet</h3>
              <p className="text-gray-600">Orders will appear here when customers place them</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-lg font-bold mb-3">Order Details</h3>
                      <p className="text-gray-600"><span className="font-semibold">Order ID:</span> {order.id}</p>
                      <p className="text-gray-600"><span className="font-semibold">Date:</span> {new Date(order.orderDate).toLocaleString()}</p>
                      <p className="text-gray-600"><span className="font-semibold">Total:</span> ₹{order.totalAmount}</p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Status:</span>{' '}
                        <span className={`font-bold ${
                          order.status === 'Pending' ? 'text-yellow-600' :
                          order.status === 'Processing' ? 'text-blue-600' :
                          order.status === 'Shipped' ? 'text-purple-600' :
                          order.status === 'Delivered' ? 'text-green-600' :
                          'text-red-600'
                        }`}>
                          {order.status}
                        </span>
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold mb-3">Customer Details</h3>
                      <p className="text-gray-600"><span className="font-semibold">Name:</span> {order.userName}</p>
                      <p className="text-gray-600"><span className="font-semibold">Email:</span> {order.userEmail}</p>
                      <p className="text-gray-600"><span className="font-semibold">Phone:</span> {order.userPhone}</p>
                      <p className="text-gray-600"><span className="font-semibold">Address:</span> {order.userAddress}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-bold mb-3">Order Items</h3>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center py-2 border-b">
                          <div>
                            <span className="font-semibold">{item.name}</span>
                            <span className="text-gray-600"> ({item.weight})</span>
                          </div>
                          <div className="text-right">
                            <span className="text-gray-600">x{item.quantity}</span>
                            <span className="ml-4 font-semibold">₹{item.price * item.quantity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3">Update Status</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                        <button
                          key={status}
                          onClick={() => updateOrderStatus(order.id, status)}
                          className={`px-4 py-2 rounded-full font-semibold transition-all ${
                            order.status === status
                              ? 'bg-orange-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Store Settings</h2>
          
          <form onSubmit={handleSettingsUpdate} className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Admin Email *</label>
                <input
                  type="email"
                  value={adminSettings.email}
                  onChange={(e) => setAdminSettings({ ...adminSettings, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <p className="text-sm text-gray-600 mt-1">Orders will be sent to this email address</p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Store Name *</label>
                <input
                  type="text"
                  value={adminSettings.storeName}
                  onChange={(e) => setAdminSettings({ ...adminSettings, storeName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Store Description *</label>
                <textarea
                  value={adminSettings.storeDescription}
                  onChange={(e) => setAdminSettings({ ...adminSettings, storeDescription: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-bold text-blue-800 mb-2">Email Configuration</h3>
                <p className="text-sm text-blue-700">
                  To enable email notifications, you need to configure EmailJS:
                </p>
                <ol className="text-sm text-blue-700 list-decimal list-inside mt-2 space-y-1">
                  <li>Sign up at <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="underline">emailjs.com</a></li>
                  <li>Create an email service and template</li>
                  <li>Add your credentials to the Cart component</li>
                </ol>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
