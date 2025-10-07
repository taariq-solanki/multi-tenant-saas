import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";

function AnimatedRoutes({ tenantID, setTenantID, userID, setUserID }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/login"
            element={
              <Login
                onLogin={(tID, uID) => {
                  setTenantID(tID);
                  setUserID(uID);
                }}
              />
            }
          />

          <Route
            path="/dashboard"
            element={
              tenantID ? (
                <Dashboard tenantID={tenantID} />
              ) : (
                <AccessRequired message="Please login first to access the dashboard." />
              )
            }
          />

          <Route
            path="/products"
            element={
              tenantID && userID ? (
                <Products tenantID={tenantID} userID={userID} />
              ) : (
                <AccessRequired message="Please login first to view products." />
              )
            }
          />

           <Route
             path="/"
             element={
               <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                 {/* Hero Section */}
                 <div className="h-screen flex items-center justify-center">
                   <motion.div
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6 }}
                     className="max-w-6xl mx-auto text-center px-4"
                   >
                     <motion.div
                       initial={{ scale: 0.8 }}
                       animate={{ scale: 1 }}
                       transition={{ delay: 0.2, duration: 0.5 }}
                       className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-xl border border-gray-200 dark:border-gray-700"
                     >
                       <h1 className="text-6xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
                         Shop Smart with <span className="text-blue-600 dark:text-blue-400">Mkarter</span>
                       </h1>
                       <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8 font-medium">
                         Your ultimate online shopping destination
                       </p>
                     <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
                       Discover amazing products, enjoy seamless shopping experience, and get the best deals. 
                       From electronics to fashion, home goods to gadgets - find everything you need in one place. 
                       Fast delivery, secure payments, and 24/7 customer support.
                     </p>
                     <div className="max-w-4xl mx-auto mb-12">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                         <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🛍️ Shop with Confidence</h3>
                           <p className="text-gray-600 dark:text-gray-300 text-sm">
                             Browse thousands of verified products from trusted sellers. Secure checkout, buyer protection, 
                             and easy returns make shopping worry-free.
                           </p>
                         </div>
                         <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">⚡ Lightning Fast Delivery</h3>
                           <p className="text-gray-600 dark:text-gray-300 text-sm">
                             Get your orders delivered in 1-2 days with our premium shipping network. 
                             Track your packages in real-time and receive notifications at every step.
                           </p>
                         </div>
                       </div>
                     </div>
                       <div className="flex flex-col sm:flex-row justify-center gap-6">
                         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                           <Link
                             to="/signup"
                             className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                           >
                             Get Started
                           </Link>
                         </motion.div>
                         <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                           <Link
                             to="/login"
                             className="inline-block bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1"
                           >
                             Login
                           </Link>
                         </motion.div>
                       </div>
                     </motion.div>
                   </motion.div>
                 </div>

                 {/* About Section */}
                 <div className="py-20 bg-white dark:bg-gray-800">
                   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-16">
                       <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                         Why Choose <span className="text-blue-600 dark:text-blue-400">Mkarter</span>
                       </h2>
                       <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                         We're your trusted shopping partner, offering the best products at unbeatable prices
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
                           <span className="text-2xl">🚀</span>
                         </div>
                         <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Best Prices Guaranteed</h3>
                         <p className="text-gray-600 dark:text-gray-300">
                           We compare prices across the market to ensure you get the best deals. Price match guarantee on all products.
                         </p>
                       </motion.div>
                       
                       <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.6, delay: 0.2 }}
                         className="text-center"
                       >
                         <div className="bg-green-100 dark:bg-green-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                           <span className="text-2xl">🔒</span>
                         </div>
                         <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Secure Shopping</h3>
                         <p className="text-gray-600 dark:text-gray-300">
                           Your personal and payment information is protected with bank-level encryption. Shop with complete peace of mind.
                         </p>
                       </motion.div>
                       
                       <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.6, delay: 0.4 }}
                         className="text-center"
                       >
                         <div className="bg-purple-100 dark:bg-purple-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                           <span className="text-2xl">🎯</span>
                         </div>
                         <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Easy Returns</h3>
                         <p className="text-gray-600 dark:text-gray-300">
                           30-day hassle-free returns on all products. Free return shipping and instant refunds for your convenience.
                         </p>
                       </motion.div>
                     </div>
                   </div>
                 </div>

                 {/* Additional Features Section */}
                 <div className="py-20 bg-gray-50 dark:bg-gray-900">
                   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-16">
                       <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                         Shopping Features
                       </h2>
                       <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                         Everything you need for the perfect shopping experience
                       </p>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                       <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.6 }}
                         className="text-center"
                       >
                         <div className="bg-orange-100 dark:bg-orange-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                           <span className="text-2xl">💳</span>
                         </div>
                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Multiple Payment Options</h3>
                         <p className="text-gray-600 dark:text-gray-300 text-sm">
                           Pay with credit cards, digital wallets, or buy now pay later. All transactions are secure and encrypted.
                         </p>
                       </motion.div>
                       
                       <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.6, delay: 0.1 }}
                         className="text-center"
                       >
                         <div className="bg-red-100 dark:bg-red-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                           <span className="text-2xl">📱</span>
                         </div>
                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Mobile Shopping</h3>
                         <p className="text-gray-600 dark:text-gray-300 text-sm">
                           Shop on the go with our mobile-optimized experience. Browse, compare, and buy from anywhere.
                         </p>
                       </motion.div>
                       
                       <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.6, delay: 0.2 }}
                         className="text-center"
                       >
                         <div className="bg-yellow-100 dark:bg-yellow-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                           <span className="text-2xl">📊</span>
                         </div>
                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Recommendations</h3>
                         <p className="text-gray-600 dark:text-gray-300 text-sm">
                           AI-powered product recommendations based on your browsing history and preferences.
                         </p>
                       </motion.div>
                       
                       <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.6, delay: 0.3 }}
                         className="text-center"
                       >
                         <div className="bg-indigo-100 dark:bg-indigo-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                           <span className="text-2xl">🛒</span>
                         </div>
                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Wishlist & Save</h3>
                         <p className="text-gray-600 dark:text-gray-300 text-sm">
                           Save your favorite items to wishlist, get price drop alerts, and never miss a deal.
                         </p>
                       </motion.div>
                     </div>
                   </div>
                 </div>

                 {/* Testimonials Section */}
                 <div className="py-20 bg-white dark:bg-gray-800">
                   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-16">
                       <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                         What Our <span className="text-blue-600 dark:text-blue-400">Shoppers</span> Say
                       </h2>
                       <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                         Join thousands of happy customers who love shopping with Mkarter
                       </p>
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.6 }}
                         className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
                       >
                         <div className="flex items-center mb-4">
                           <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                             J
                           </div>
                           <div className="ml-4">
                             <h4 className="font-semibold text-gray-900 dark:text-white">John Smith</h4>
                             <p className="text-gray-600 dark:text-gray-300 text-sm">Verified Customer</p>
                           </div>
                         </div>
                         <p className="text-gray-600 dark:text-gray-300">
                           "I love shopping on Mkarter! The prices are amazing and delivery is super fast. 
                           I've been a customer for 2 years and never had any issues. Highly recommended!"
                         </p>
                         <div className="mt-4 flex items-center">
                           <span className="text-yellow-400 text-sm">★★★★★</span>
                           <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">Verified Customer</span>
                         </div>
                       </motion.div>
                       
                       <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.6, delay: 0.2 }}
                         className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
                       >
                         <div className="flex items-center mb-4">
                           <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                             S
                           </div>
                           <div className="ml-4">
                             <h4 className="font-semibold text-gray-900 dark:text-white">Sarah Johnson</h4>
                             <p className="text-gray-600 dark:text-gray-300 text-sm">Verified Customer</p>
                           </div>
                         </div>
                         <p className="text-gray-600 dark:text-gray-300">
                           "Best online shopping experience ever! Great product selection, easy checkout, and excellent customer service. 
                           I always find what I'm looking for at great prices."
                         </p>
                         <div className="mt-4 flex items-center">
                           <span className="text-yellow-400 text-sm">★★★★★</span>
                           <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">Verified Customer</span>
                         </div>
                       </motion.div>
                       
                       <motion.div
                         initial={{ opacity: 0, y: 20 }}
                         whileInView={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.6, delay: 0.4 }}
                         className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
                       >
                         <div className="flex items-center mb-4">
                           <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                             M
                           </div>
                           <div className="ml-4">
                             <h4 className="font-semibold text-gray-900 dark:text-white">Mike Chen</h4>
                             <p className="text-gray-600 dark:text-gray-300 text-sm">Verified Customer</p>
                           </div>
                         </div>
                         <p className="text-gray-600 dark:text-gray-300">
                           "Mkarter has everything I need! From electronics to home goods, the quality is always top-notch. 
                           Fast shipping and easy returns make it my go-to shopping destination."
                         </p>
                         <div className="mt-4 flex items-center">
                           <span className="text-yellow-400 text-sm">★★★★★</span>
                           <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">Verified Customer</span>
                         </div>
                       </motion.div>
                     </div>
                   </div>
                 </div>
               </div>
             }
           />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

function AccessRequired({ message }) {
  return (
    <div className="text-center py-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-lg shadow-md p-8 max-w-md mx-auto"
      >
        <h2 className="text-2xl font-bold text-foreground mb-4">Access Required</h2>
        <p className="text-muted-foreground mb-6">{message}</p>
        <Link
          to="/login"
          className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors duration-200"
        >
          Go to Login
        </Link>
      </motion.div>
    </div>
  );
}

function App() {
  const [tenantID, setTenantID] = useState(null);
  const [userID, setUserID] = useState(null);

  return (
    <ThemeProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Navbar tenantID={tenantID} userID={userID} />
            <CartDrawer tenantID={tenantID} userID={userID} />
            <AnimatedRoutes
              tenantID={tenantID}
              setTenantID={setTenantID}
              userID={userID}
              setUserID={setUserID}
            />
            <Toaster position="top-right" />
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
