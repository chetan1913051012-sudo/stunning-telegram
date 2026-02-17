import { Product } from '../App';
import { ShoppingCart, Package } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function ProductList({ products, onAddToCart }: ProductListProps) {
  const availableProducts = products.filter(p => p.inStock);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Premium Spices Collection</h1>
        <p className="text-lg text-gray-600">
          Discover our handpicked selection of authentic spices
        </p>
      </div>

      {availableProducts.length === 0 ? (
        <div className="text-center py-20">
          <Package className="mx-auto text-gray-400 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No Products Available</h2>
          <p className="text-gray-600">Check back soon for amazing spices!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {availableProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 duration-300"
            >
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                {product.inStock && (
                  <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    In Stock
                  </span>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <p className="text-orange-600 font-semibold mb-1">Weight: {product.weight}</p>
                
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-3xl font-bold text-orange-600">₹{product.price}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => onAddToCart(product)}
                  className="w-full mt-4 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all flex items-center justify-center space-x-2 group"
                >
                  <ShoppingCart className="group-hover:scale-110 transition-transform" size={20} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
