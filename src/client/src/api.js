const API_BASE = "/api"; // Use relative URL for production deployment

export async function signup(tenantID, userID, password, data) {
  const response = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tenantID, userID, password, data }),
  });
  return response.json();
}

export async function login(tenantID, userID, password) {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tenantID, userID, password }),
  });
  return response.json();
}

export async function getTenantUsers(tenantID) {
  const response = await fetch(`${API_BASE}/tenant/${tenantID}`);
  return response.json();
}
export async function buyProduct(tenantID, userID, product) {
  const response = await fetch(`${API_BASE}/buy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tenantID, userID, product }),
  });
  return response.json();
}
