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
                         Welcome to <span className="text-blue-600 dark:text-blue-400">Mkarter</span>
                       </h1>
                       <p className="text-2xl text-gray-600 dark:text-gray-300 mb-8 font-medium">
                         Your modern multi-tenant e-commerce platform
                       </p>
                     <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
                       Experience the future of online shopping with Mkarter - a powerful, scalable e-commerce solution 
                       designed for businesses of all sizes. From small startups to enterprise corporations, 
                       Mkarter provides everything you need to build, manage, and scale your online store.
                     </p>
                     <div className="max-w-4xl mx-auto mb-12">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                         <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🚀 Start Your Business Today</h3>
                           <p className="text-gray-600 dark:text-gray-300 text-sm">
                             Launch your online store in minutes with our intuitive setup wizard. No technical knowledge required - 
                             just follow our step-by-step guide and start selling immediately.
                           </p>
                         </div>
                         <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                           <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">📈 Scale Without Limits</h3>
                           <p className="text-gray-600 dark:text-gray-300 text-sm">
                             From 10 to 10,000 customers - our platform grows with your business. Advanced infrastructure 
                             ensures lightning-fast performance even during peak traffic periods.
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
                         About <span className="text-blue-600 dark:text-blue-400">Mkarter</span>
                       </h2>
                       <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                         We're revolutionizing e-commerce with cutting-edge technology and innovative solutions
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
                         <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Fast & Scalable</h3>
                         <p className="text-gray-600 dark:text-gray-300">
                           Built for performance with lightning-fast load times and unlimited scalability to grow with your business.
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
                         <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Secure & Reliable</h3>
                         <p className="text-gray-600 dark:text-gray-300">
                           Enterprise-grade security with 99.9% uptime guarantee. Your data and customers are always protected.
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
                         <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Easy to Use</h3>
                         <p className="text-gray-600 dark:text-gray-300">
                           Intuitive interface designed for both beginners and experts. Get started in minutes, not hours.
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
                         Why Choose <span className="text-blue-600 dark:text-blue-400">Mkarter</span>
                       </h2>
                       <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                         Discover the features that make Mkarter the perfect choice for your e-commerce needs
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
                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Payment Processing</h3>
                         <p className="text-gray-600 dark:text-gray-300 text-sm">
                           Secure payment processing with multiple payment gateways and fraud protection.
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
                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Mobile Responsive</h3>
                         <p className="text-gray-600 dark:text-gray-300 text-sm">
                           Fully responsive design that works perfectly on all devices and screen sizes.
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
                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Analytics</h3>
                         <p className="text-gray-600 dark:text-gray-300 text-sm">
                           Comprehensive analytics and reporting tools to track your business performance.
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
                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Shopping Cart</h3>
                         <p className="text-gray-600 dark:text-gray-300 text-sm">
                           Advanced shopping cart with wishlist, recommendations, and quick checkout.
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
                         What Our <span className="text-blue-600 dark:text-blue-400">Customers</span> Say
                       </h2>
                       <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                         Join thousands of satisfied customers who trust Mkarter for their e-commerce needs
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
                             <p className="text-gray-600 dark:text-gray-300 text-sm">CEO, TechCorp</p>
                           </div>
                         </div>
                         <p className="text-gray-600 dark:text-gray-300">
                           "Mkarter has revolutionized our e-commerce operations. The platform is incredibly user-friendly and the analytics are outstanding. 
                           We've seen a 300% increase in sales since switching to Mkarter."
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
                             <p className="text-gray-600 dark:text-gray-300 text-sm">Founder, StartupXYZ</p>
                           </div>
                         </div>
                         <p className="text-gray-600 dark:text-gray-300">
                           "The scalability of Mkarter is impressive. We've grown from 10 to 10,000 customers without any issues. 
                           The customer support team is exceptional and always available when we need help."
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
                             <p className="text-gray-600 dark:text-gray-300 text-sm">CTO, RetailPlus</p>
                           </div>
                         </div>
                         <p className="text-gray-600 dark:text-gray-300">
                           "The security features and uptime are exceptional. Our customers trust us more because of Mkarter's reliability. 
                           The fraud detection system has saved us thousands in potential losses."
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
