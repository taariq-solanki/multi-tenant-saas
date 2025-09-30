import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTenantUsers } from "../api";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Search,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Package,
  Calendar
} from "lucide-react";

export default function Dashboard({ tenantID }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedUser, setExpandedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("userID");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const result = await getTenantUsers(tenantID);
        if (result.success) {
          setUsers(result.users);
          setFilteredUsers(result.users);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [tenantID]);

  // Filter and sort users
  useEffect(() => {
    let filtered = users.filter(user =>
      user.userID.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "userID":
          aValue = a.userID;
          bValue = b.userID;
          break;
        case "orders":
          aValue = a.data.orders ? a.data.orders.length : 0;
          bValue = b.data.orders ? b.data.orders.length : 0;
          break;
        case "totalSpent":
          aValue = a.data.orders ? a.data.orders.reduce((total, order) => total + order.price, 0) : 0;
          bValue = b.data.orders ? b.data.orders.reduce((total, order) => total + order.price, 0) : 0;
          break;
        default:
          aValue = a.userID;
          bValue = b.userID;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredUsers(filtered);
  }, [users, searchTerm, sortBy, sortOrder]);

  const toggleUserExpansion = (userID) => {
    setExpandedUser(expandedUser === userID ? null : userID);
  };

  const getTotalRevenue = () => {
    return users.reduce((total, user) => {
      if (user.data.orders) {
        return total + user.data.orders.reduce((userTotal, order) => userTotal + order.price, 0);
      }
      return total;
    }, 0);
  };

  const getTotalOrders = () => {
    return users.reduce((total, user) => {
      return total + (user.data.orders ? user.data.orders.length : 0);
    }, 0);
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (column) => {
    if (sortBy !== column) return <ArrowUpDown className="w-4 h-4" />;
    return sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard - <span className="text-blue-600 dark:text-blue-400">{tenantID}</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              Manage your tenant's users and orders
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-4xl mb-8">
              Monitor your business performance with real-time analytics and insights. Track user engagement, 
              sales metrics, and revenue growth. Our comprehensive dashboard provides you with all the tools 
              you need to make data-driven decisions and optimize your e-commerce operations.
            </p>
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">📊</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Real-Time Analytics</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Live data and insights</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Get instant access to your business metrics with our advanced analytics engine. 
                    Track sales, customer behavior, and performance indicators in real-time.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">👥</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Management</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Complete customer control</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Manage your customer base with powerful tools for user segmentation, 
                    communication, and relationship management.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* About Dashboard Section */}
      <div className="py-10 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful <span className="text-blue-600 dark:text-blue-400">Analytics</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get deep insights into your business performance with our advanced analytics dashboard
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
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Real-time Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor your business performance with live data and instant insights to make informed decisions.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-green-100 dark:bg-green-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">User Management</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Track user activity, manage permissions, and analyze customer behavior patterns effectively.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-purple-100 dark:bg-purple-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Revenue Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor sales performance, track revenue growth, and identify opportunities for business expansion.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Dashboard Features Section */}
      <div className="py-10 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Dashboard <span className="text-blue-600 dark:text-blue-400">Features</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Powerful tools to manage and grow your business effectively
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-lg"
            >
              <div className="bg-blue-100 dark:bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Sales Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Track sales performance and revenue trends
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-lg"
            >
              <div className="bg-green-100 dark:bg-green-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">User Management</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Manage users, roles, and permissions
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-lg"
            >
              <div className="bg-purple-100 dark:bg-purple-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Reports</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Generate detailed business reports
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-lg"
            >
              <div className="bg-orange-100 dark:bg-orange-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Settings</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Configure system and business settings
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Business Insights Section */}
      <div className="py-10 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Business <span className="text-blue-600 dark:text-blue-400">Insights</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Make data-driven decisions with comprehensive business intelligence
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
                  📊
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Performance Metrics</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Key performance indicators</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Monitor critical business metrics including conversion rates, customer acquisition costs, and revenue growth.
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
                  🎯
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Goal Tracking</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Set and monitor business goals</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Set business objectives and track progress with automated goal monitoring and achievement alerts.
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
                  🔮
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Predictive Analytics</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">AI-powered forecasting</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Leverage machine learning to predict trends, forecast sales, and identify growth opportunities.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Dashboard Content Section */}
      <div className="py-10 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <Users className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-foreground">{users.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold text-foreground">{getTotalOrders()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">₹{getTotalRevenue().toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={sortBy === "userID" ? "default" : "outline"}
                  onClick={() => handleSort("userID")}
                  className="flex items-center space-x-2"
                >
                  <span>User ID</span>
                  {getSortIcon("userID")}
                </Button>
                <Button
                  variant={sortBy === "orders" ? "default" : "outline"}
                  onClick={() => handleSort("orders")}
                  className="flex items-center space-x-2"
                >
                  <span>Orders</span>
                  {getSortIcon("orders")}
                </Button>
                <Button
                  variant={sortBy === "totalSpent" ? "default" : "outline"}
                  onClick={() => handleSort("totalSpent")}
                  className="flex items-center space-x-2"
                >
                  <span>Total Spent</span>
                  {getSortIcon("totalSpent")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Users & Orders ({filteredUsers.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      User ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Orders Count
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Total Spent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-background divide-y divide-border">
                  {filteredUsers.map((user, index) => {
                const userTotalSpent = user.data.orders 
                  ? user.data.orders.reduce((total, order) => total + order.price, 0)
                  : 0;
                
                return (
                    <motion.tr
                      key={user.userID}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-muted/50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-foreground">
                          {user.userID}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant="secondary">
                          {user.data.orders ? user.data.orders.length : 0} orders
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                        ₹{userTotalSpent.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleUserExpansion(user.userID)}
                          className="text-primary hover:text-primary-foreground"
                        >
                          {expandedUser === user.userID ? 'Hide Orders' : 'View Orders'}
                        </Button>
                      </td>
                    </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

            {/* Expanded Order Details */}
            {expandedUser && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-border bg-muted/30"
              >
                {(() => {
                  const user = users.find(u => u.userID === expandedUser);
                  const orders = user?.data.orders || [];
                  
                  return (
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
                        <Package className="w-5 h-5" />
                        <span>Orders for {expandedUser}</span>
                      </h3>
                      {orders.length > 0 ? (
                        <div className="grid gap-4">
                          {orders.map((order, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Card>
                                <CardContent className="p-4">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <h4 className="font-medium text-foreground">{order.name}</h4>
                                      <p className="text-sm text-muted-foreground">Order #{index + 1}</p>
                                    </div>
                                    <span className="text-lg font-bold text-primary">
                                      ₹{order.price.toLocaleString()}
                                    </span>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <div className="text-muted-foreground text-4xl mb-2">📦</div>
                          <p className="text-muted-foreground">No orders yet</p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
        </div>
      </div>
    </div>
  );
}
