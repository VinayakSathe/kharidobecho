import apiClient from "./apiClient";

export const loginUser = async (credentials) => {
  const response = await apiClient.post("/jwt/login", credentials, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const registerUser = async (payload) => {
  const response = await apiClient.post("/api/v1/users/register", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const fetchBuyerInfo = async (userId) => {
  const response = await apiClient.get(`/api/v1/buyers/${userId}`);
  return response.data;
};

export const fetchSellerInfo = async (userId) => {
  const response = await apiClient.get(`/api/v1/sellers/${userId}`);
  return response.data;
};

