const API_BASE = "/api"; // Relative URL for production (proxied to server)

// ✅ Signup
export async function signup(tenantID, userID, password, data) {
  try {
    const response = await fetch(`${API_BASE}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tenantID, userID, password, data }),
    });

    const result = await response.json();
    if (!response.ok) {
      return { success: false, message: result.message || "Signup failed" };
    }
    return result;
  } catch (error) {
    return { success: false, message: "Network error: " + error.message };
  }
}

// ✅ Login
export async function login(tenantID, userID, password) {
  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tenantID, userID, password }),
    });

    const result = await response.json();
    if (!response.ok) {
      return { success: false, message: result.message || "Login failed" };
    }
    return result;
  } catch (error) {
    return { success: false, message: "Network error: " + error.message };
  }
}

// ✅ Get all users of a tenant
export async function getTenantUsers(tenantID) {
  const response = await fetch(`${API_BASE}/tenant/${tenantID}`);
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch tenant users");
  }
  return result;
}

// ✅ Buy product
export async function buyProduct(tenantID, userID, product) {
  const response = await fetch(`${API_BASE}/buy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tenantID, userID, product }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to buy product");
  }
  return result;
}
