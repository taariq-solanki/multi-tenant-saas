const express = require("express");
const router = express.Router();
const dynamoDBService = require("../services/dynamodb");

// Health check
router.get("/ping", (req, res) => {
  res.json({ success: true, message: "API router is working!" });
});

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { tenantID, userID, password, data } = req.body;
    if (!tenantID || !userID || !password) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const result = await dynamoDBService.createTenantUser(tenantID, userID, password, data);
    res.status(201).json(result);
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { tenantID, userID, password } = req.body;
    if (!tenantID || !userID || !password) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    const result = await dynamoDBService.validateUser(tenantID, userID, password);
    if (result.success) res.status(200).json(result);
    else res.status(401).json(result);
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
