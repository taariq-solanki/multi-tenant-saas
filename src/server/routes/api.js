const express = require("express");
const router = express.Router();
const dynamoDBService = require("../services/dynamodb");

// Health check
router.get("/ping", (req, res) => {
  res.json({ success: true, message: "API router is working!" });
});

// Signup
router.post("/signup", async (req, res) => {
  console.log("Incoming /signup body:", req.body);
  try {
    const { tenantID, userID, password, data } = req.body;
    const userType = data?.userType || "user"; // Default to regular user
    
    // Enhanced validation
    if (!tenantID || !userID || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields: tenantID, userID, and password are required" 
      });
    }
    
    // Validate field types and lengths
    if (typeof tenantID !== 'string' || tenantID.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "tenantID must be a non-empty string" 
      });
    }
    
    if (typeof userID !== 'string' || userID.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "userID must be a non-empty string" 
      });
    }
    
    if (typeof password !== 'string' || password.length < 3) {
      return res.status(400).json({ 
        success: false, 
        message: "password must be at least 3 characters long" 
      });
    }
    
    const result = await dynamoDBService.createTenantUser(
      tenantID.trim(), 
      userID.trim(), 
      password, 
      { ...data, userType, role: userType === "tenant" ? "admin" : "user" }
    );
    
    if (result.success) {
      res.status(201).json({ 
        success: true, 
        message: userType === "tenant" 
          ? "Tenant admin account created successfully!" 
          : "User account created successfully!"
      });
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  console.log("Incoming /login body:", req.body);
  try {
    const { tenantID, userID, password } = req.body;
    
    // Enhanced validation
    if (!tenantID || !userID || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields: tenantID, userID, and password are required" 
      });
    }
    
    // Validate field types and lengths
    if (typeof tenantID !== 'string' || tenantID.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "tenantID must be a non-empty string" 
      });
    }
    
    if (typeof userID !== 'string' || userID.trim().length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "userID must be a non-empty string" 
      });
    }
    
    if (typeof password !== 'string' || password.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "password is required" 
      });
    }
    
    const result = await dynamoDBService.validateUser(
      tenantID.trim(), 
      userID.trim(), 
      password
    );
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(401).json(result);
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Get tenant users
router.get("/tenant/:tenantID", async (req, res) => {
  try {
    const result = await dynamoDBService.getTenantUsers(req.params.tenantID);
    res.json(result);
  } catch (error) {
    console.error("Tenant fetch error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Buy product
router.post("/buy", async (req, res) => {
  try {
    const { tenantID, userID, product } = req.body;
    if (!tenantID || !userID || !product) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const user = await dynamoDBService.validateUser(tenantID, userID, "");
    if (!user.success) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const newOrders = user.user.data.orders || [];
    newOrders.push(product);

    const result = await dynamoDBService.updateUserOrders(tenantID, userID, newOrders);
    res.json({ success: true, message: "Product bought!", orders: newOrders });
  } catch (error) {
    console.error("Buy error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Get user orders
router.get("/orders/:tenantID/:userID", async (req, res) => {
  try {
    const { tenantID, userID } = req.params;
    const result = await dynamoDBService.getUserOrders(tenantID, userID);
    res.json(result);
  } catch (error) {
    console.error("Orders fetch error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
