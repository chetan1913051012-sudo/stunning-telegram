import { ChevronRight, Award, Truck, Shield, Heart } from 'lucide-react';

interface HomeProps {
  onShopNow: () => void;
}

export function Home({ onShopNow }: HomeProps) {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Welcome to Homelike Spices
              </h1>
              <p className="text-xl text-orange-100">
                Discover the finest collection of authentic, premium quality spices that bring the taste of tradition to your kitchen.
              </p>
              <button
                onClick={onShopNow}
                className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl flex items-center space-x-2 group"
              >
                <span>Shop Now</span>
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={24} />
              </button>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-white bg-opacity-10 rounded-3xl backdrop-blur-sm flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1596040033229-a0b3b83ec15c?w=800"
                  alt="Spices"
                  className="w-full h-full object-cover rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose Homelike Spices?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Premium Quality</h3>
              <p className="text-gray-600">100% pure and authentic spices sourced from the best farms</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable delivery right to your doorstep</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Safe & Secure</h3>
              <p className="text-gray-600">Secure payment options and data protection</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Made with Love</h3>
              <p className="text-gray-600">Carefully selected and packed with care for your family</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1615485500834-bc10199bc743?w=800"
                alt="Spices Collection"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-800">Our Story</h2>
              <p className="text-lg text-gray-600">
                Homelike Spices is a startup born from a passion for bringing authentic, premium quality spices to every home. We believe that great food starts with great ingredients.
              </p>
              <p className="text-lg text-gray-600">
                Our spices are carefully sourced from trusted farms and processed with utmost care to preserve their natural aroma, flavor, and health benefits. Every packet is a promise of quality and authenticity.
              </p>
              <button
                onClick={onShopNow}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all"
              >
                Explore Our Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Cooking?</h2>
          <p className="text-xl mb-8 text-orange-100">
            Join thousands of satisfied customers who trust Homelike Spices for their daily cooking needs
          </p>
          <button
            onClick={onShopNow}
            className="bg-white text-orange-600 px-12 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl"
          >
            Start Shopping
          </button>
        </div>
      </section>
    </div>
  );
}
