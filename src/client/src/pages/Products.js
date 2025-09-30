import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../contexts/CartContext";
import { buyProduct } from "../api";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import ProductModal from "../components/ProductModal";
import { 
  ShoppingCart, 
  Heart, 
  Star,
  Eye,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import toast from "react-hot-toast";

const PRODUCTS = [
  { 
    id: 1, 
    name: "MacBook Pro", 
    price: 150000,
    image: "💻",
    description: "Powerful laptop for professionals",
    category: "Electronics",
    rating: 4.8,
    reviews: 124
  },
  { 
    id: 2, 
    name: "iPhone 15", 
    price: 80000,
    image: "📱",
    description: "Latest smartphone with advanced features",
    category: "Electronics",
    rating: 4.9,
    reviews: 89
  },
  { 
    id: 3, 
    name: "Wireless Headphones", 
    price: 15000,
    image: "🎧",
    description: "Premium noise-canceling headphones",
    category: "Audio",
    rating: 4.7,
    reviews: 156
  },
  { 
    id: 4, 
    name: "Smart Watch", 
    price: 25000,
    image: "⌚",
    description: "Fitness tracking and smart notifications",
    category: "Wearables",
    rating: 4.6,
    reviews: 203
  },
  { 
    id: 5, 
    name: "Gaming Keyboard", 
    price: 8000,
    image: "⌨️",
    description: "Mechanical keyboard for gaming enthusiasts",
    category: "Gaming",
    rating: 4.5,
    reviews: 78
  },
  { 
    id: 6, 
    name: "4K Monitor", 
    price: 35000,
    image: "🖥️",
    description: "Ultra-high definition display",
    category: "Electronics",
    rating: 4.8,
    reviews: 92
  }
];

const FEATURED_PRODUCTS = PRODUCTS.slice(0, 4);

export default function Products({ tenantID, userID }) {
  const { addToCart, setIsCartOpen } = useCart();
  const [loading, setLoading] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleBuy = async (product) => {
    setLoading(prev => ({ ...prev, [product.id]: true }));
    
    try {
      const result = await buyProduct(tenantID, userID, product);
      toast.success(result.message);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(prev => ({ ...prev, [product.id]: false }));
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % FEATURED_PRODUCTS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + FEATURED_PRODUCTS.length) % FEATURED_PRODUCTS.length);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
              Our <span className="text-blue-600 dark:text-blue-400">Products</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-4">Discover amazing products at great prices</p>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-4xl mx-auto mb-8">
              Browse through our carefully curated collection of premium products. From cutting-edge electronics 
              to stylish accessories, we offer the latest trends and timeless classics. Each product is 
              handpicked for quality, value, and customer satisfaction.
            </p>
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">🏆</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Premium Quality</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Award-winning products</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Every product in our catalog undergoes rigorous quality testing to ensure it meets our high standards. 
                    We partner with trusted manufacturers and brands to bring you the best.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">💰</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Best Prices</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Competitive pricing guaranteed</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    We negotiate directly with suppliers to offer you the best prices in the market. 
                    Our price match guarantee ensures you always get the best deal.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">🚚</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Fast Shipping</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Free delivery on orders over $50</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Enjoy free shipping on orders over $50 with our express delivery service. 
                    Most orders are delivered within 2-3 business days.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* About Products Section */}
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our <span className="text-blue-600 dark:text-blue-400">Products</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're committed to providing the highest quality products with exceptional value
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-blue-100 dark:bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Premium Quality</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every product is carefully selected and tested to ensure the highest quality standards and customer satisfaction.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-green-100 dark:bg-green-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Best Prices</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Competitive pricing with regular discounts and special offers. Get the best value for your money.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-purple-100 dark:bg-purple-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Quick and reliable shipping worldwide. Most orders delivered within 2-3 business days.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Product Categories Section */}
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Shop by <span className="text-blue-600 dark:text-blue-400">Category</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our wide range of product categories to find exactly what you're looking for
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Electronics</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Latest gadgets and tech</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">👕</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fashion</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Trendy clothing & accessories</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Home & Garden</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Everything for your home</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Gaming</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Gaming gear & accessories</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Customer <span className="text-blue-600 dark:text-blue-400">Reviews</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See what our customers are saying about their shopping experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Alex Thompson</h4>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★★★★★</span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm ml-2">5.0</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "Amazing product quality and fast shipping. The customer service is outstanding!"
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  L
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Lisa Wang</h4>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★★★★★</span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm ml-2">5.0</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "Great prices and excellent selection. I've been a customer for over a year now."
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  D
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">David Rodriguez</h4>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★★★★★</span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm ml-2">5.0</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "The website is easy to navigate and the checkout process is smooth. Highly recommended!"
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Products Grid Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Featured Products Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-16"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Featured Products</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={prevSlide}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextSlide}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="relative overflow-hidden rounded-xl">
          <motion.div
            className="flex"
            animate={{ x: -currentSlide * 100 + "%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {FEATURED_PRODUCTS.map((product) => (
              <div key={product.id} className="w-full flex-shrink-0">
                <Card className="mx-2">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-6xl mb-4">{product.image}</div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({product.reviews} reviews)
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-primary mb-4">
                        ₹{product.price.toLocaleString()}
                      </div>
                      <Button
                        onClick={() => handleViewProduct(product)}
                        className="w-full"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* All Products Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {PRODUCTS.map((product) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
              <CardContent className="p-6">
                <div className="text-6xl text-center mb-4">
                  {product.image}
                </div>
                
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{product.category}</Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-muted-foreground">
                      {product.rating}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {product.name}
                </h3>
                
                <p className="text-muted-foreground mb-4 text-sm">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary">
                    ₹{product.price.toLocaleString()}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <Button
                    onClick={() => handleViewProduct(product)}
                    className="w-full"
                    variant="outline"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleBuy(product)}
                      disabled={loading[product.id]}
                      className="flex-1"
                    >
                      {loading[product.id] ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Buying...
                        </div>
                      ) : (
                        'Buy Now'
                      )}
                    </Button>
                    
                    <Button
                      onClick={() => handleAddToCart(product)}
                      variant="outline"
                      size="icon"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="icon"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

        {/* Product Modal */}
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            tenantID={tenantID}
            userID={userID}
          />
        )}
        </div>
      </div>
    </div>
  );
}
