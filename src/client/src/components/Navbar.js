import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { useCart } from "../contexts/CartContext";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  ShoppingCart, 
  Sun, 
  Moon, 
  Menu, 
  X,
  Home,
  Package,
  BarChart3,
  LogIn,
  UserPlus
} from "lucide-react";

export default function Navbar({ tenantID, userID }) {
  const { theme, toggleTheme } = useTheme();
  const { getTotalItems, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/products", icon: Package, requiresAuth: true },
    { name: "Dashboard", href: "/dashboard", icon: BarChart3, requiresAuth: true },
  ];

  const authLinks = [
    { name: "Login", href: "/login", icon: LogIn, showWhen: !tenantID },
    { name: "Signup", href: "/signup", icon: UserPlus, showWhen: !tenantID },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 border-b border-gray-200 dark:border-gray-700 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <Link
              to="/"
              className="flex items-center space-x-3 text-2xl font-bold hover:opacity-80 transition-all duration-300 group"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 border border-gray-600">
                  <span className="text-white font-black text-2xl">M</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full animate-pulse"></div>
              </div>
                      <span className="text-gray-900 dark:text-white font-black text-3xl tracking-tight">
                        Mkarter
                      </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              if (item.requiresAuth && !tenantID) return null;
              
              const Icon = item.icon;
              return (
                <motion.div key={item.name} whileHover={{ scale: 1.05 }}>
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            {tenantID && (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {getTotalItems() > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </motion.div>
            )}

            {/* Theme Toggle */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="transition-colors"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </Button>
            </motion.div>

            {/* Auth Links */}
            {authLinks.map((link) => {
              if (!link.showWhen) return null;
              
              const Icon = link.icon;
              return (
                <motion.div key={link.name} whileHover={{ scale: 1.05 }}>
                  <Link
                    to={link.href}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </Link>
                </motion.div>
              );
            })}

            {/* Mobile menu button */}
            <motion.div
              className="md:hidden"
              whileHover={{ scale: 1.05 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
            {navigation.map((item) => {
              if (item.requiresAuth && !tenantID) return null;
              
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            {authLinks.map((link) => {
              if (!link.showWhen) return null;
              
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
