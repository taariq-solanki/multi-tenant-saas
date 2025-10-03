import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  User,
  Lock,
  Building2,
  Eye,
  EyeOff
} from "lucide-react";
import toast from "react-hot-toast";

export default function Login({ onLogin }) {
  const [tenantID, setTenantID] = useState("");
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("user"); // "tenant" or "user"
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log("Login attempt with:", { tenantID, userID, password: "***" });
      
      const result = await login(tenantID, userID, password);
      
      console.log("Login result:", result);
    
      if (result.success) {
        onLogin(tenantID, userID);
        toast.success(result.message || "Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        console.error("Login failed:", result.message);
        toast.error(result.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full"
        >
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto h-12 w-12 bg-primary rounded-full flex items-center justify-center mb-4"
            >
              <User className="h-6 w-6 text-primary-foreground" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <CardTitle className="text-2xl text-gray-900 dark:text-white">Sign in to your account</CardTitle>
              <p className="text-gray-600 dark:text-gray-300 mt-2 mb-4">
                Welcome back! Access your Mkarter dashboard and manage your e-commerce business.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">💡</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100">Pro Tip</h4>
                    <p className="text-xs text-blue-700 dark:text-blue-200">
                      Use your tenant ID and user credentials to access your personalized dashboard with advanced analytics.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Or{' '}
                <Link
                  to="/signup"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  create a new account
                </Link>
              </p>
            </motion.div>
          </CardHeader>

          <CardContent>
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
              onSubmit={handleSubmit}
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <Label className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Login As</span>
                  </Label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        value="tenant"
                        checked={userType === "tenant"}
                        onChange={(e) => setUserType(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        🏢 Tenant Admin
                      </span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="userType"
                        value="user"
                        checked={userType === "user"}
                        onChange={(e) => setUserType(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        👤 Regular User
                      </span>
                    </label>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-2"
                >
                  <Label htmlFor="tenantID" className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4" />
                    <span>Tenant ID</span>
                  </Label>
                  <Input
                    id="tenantID"
                    name="tenantID"
                    type="text"
                    required
                    placeholder="Enter your tenant ID"
                    value={tenantID}
                    onChange={(e) => setTenantID(e.target.value)}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="space-y-2"
                >
                  <Label htmlFor="userID" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>User ID</span>
                  </Label>
                  <Input
                    id="userID"
                    name="userID"
                    type="text"
                    required
                    placeholder="Enter your user ID"
                    value={userID}
                    onChange={(e) => setUserID(e.target.value)}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="space-y-2"
                >
                  <Label htmlFor="password" className="flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>Password</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-center"
              >
                <Link
                  to="/"
                  className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  ← Back to home
                </Link>
          </motion.div>
        </motion.form>
      </CardContent>
    </Card>
  </motion.div>
</div>

      {/* About Login Section */}
      <div className="py-10 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Secure <span className="text-blue-600 dark:text-blue-400">Authentication</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Your account security is our top priority with enterprise-grade protection
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
                <span className="text-2xl">🔐</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Secure Login</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Advanced encryption and security protocols protect your account and personal information.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-green-100 dark:bg-green-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Fast Access</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Quick and seamless login process to get you into your dashboard in seconds.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-purple-100 dark:bg-purple-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Data Protection</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your data is protected with industry-leading security measures and privacy controls.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Security Features Section */}
      <div className="py-10 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced <span className="text-blue-600 dark:text-blue-400">Security</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Multiple layers of security to keep your account and data safe
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-lg"
            >
              <div className="bg-red-100 dark:bg-red-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">SSL Encryption</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                End-to-end encryption for all data transmission
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-lg"
            >
              <div className="bg-orange-100 dark:bg-orange-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">2FA Support</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Two-factor authentication for extra security
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-lg"
            >
              <div className="bg-yellow-100 dark:bg-yellow-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fraud Detection</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                AI-powered fraud detection and prevention
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-lg"
            >
              <div className="bg-indigo-100 dark:bg-indigo-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔐</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Privacy First</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                GDPR compliant with strict privacy controls
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Login Benefits Section */}
      <div className="py-10 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why <span className="text-blue-600 dark:text-blue-400">Login</span> with Us
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the benefits of being a Mkarter member
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
                  💎
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Premium Access</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Exclusive features and benefits</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Get access to premium features, priority support, and exclusive deals available only to logged-in users.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  📊
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Personal Dashboard</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Track your activity and orders</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor your orders, track shipping, view purchase history, and manage your account preferences.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  🎯
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Personalized Experience</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Customized recommendations</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Get personalized product recommendations based on your preferences and purchase history.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
