import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { signup } from "../api";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { 
  User, 
  Lock, 
  Building2,
  Eye,
  EyeOff,
  UserPlus
} from "lucide-react";
import toast from "react-hot-toast";

export default function Signup() {
  const [tenantID, setTenantID] = useState("");
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("tenant"); // "tenant" or "user"

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      console.log("Signup payload being sent:", { tenantID, userID, password, userType });
      
      const result = await signup(tenantID, userID, password, { userType });
      
      console.log("Signup response received:", result);
    
      if (result.success) {
        toast.success(result.message || "Signup successful!");
      } else {
        toast.error(result.message || "Signup failed.");
      }
    } catch (error) {
      toast.error(error.message || "Signup failed. Please try again.");
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
              <UserPlus className="h-6 w-6 text-primary-foreground" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <CardTitle className="text-2xl text-gray-900 dark:text-white">Create your account</CardTitle>
              <p className="text-gray-600 dark:text-gray-300 mt-2 mb-4">
                Join thousands of successful businesses using Mkarter to grow their online presence.
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">🎉</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-green-900 dark:text-green-100">New User Bonus</h4>
                    <p className="text-xs text-green-700 dark:text-green-200">
                      Get 30 days free premium features and priority support when you create your account today.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Or{' '}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  sign in to your existing account
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
                    <UserPlus className="w-4 h-4" />
                    <span>Account Type</span>
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
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {userType === "tenant" 
                      ? "Create a new tenant organization and become the admin"
                      : "Join an existing tenant organization as a regular user"
                    }
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-2"
                >
                  <Label htmlFor="tenantID" className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4" />
                    <span>{userType === "tenant" ? "Your Tenant ID" : "Tenant ID to Join"}</span>
                  </Label>
                  <Input
                    id="tenantID"
                    name="tenantID"
                    type="text"
                    required
                    placeholder={userType === "tenant" ? "Choose your tenant ID (e.g., mycompany)" : "Enter existing tenant ID to join"}
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
                      placeholder="Create a password"
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

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                  className="space-y-2"
                >
                  <Label htmlFor="confirmPassword" className="flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>Confirm Password</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pr-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
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
                transition={{ delay: 1.1 }}
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
                      Creating account...
                    </div>
                  ) : (
                    'Create account'
                  )}
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
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

      {/* About Signup Section */}
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Join <span className="text-blue-600 dark:text-blue-400">Mkarter</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Start your e-commerce journey with our powerful platform designed for success
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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Quick Setup</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get started in minutes with our intuitive setup process. No technical knowledge required.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-green-100 dark:bg-green-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Business Ready</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Everything you need to run a successful online business, from inventory to analytics.
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
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Success Focused</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Join thousands of successful businesses that trust Mkarter for their e-commerce needs.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
