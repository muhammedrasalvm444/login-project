import axios from "axios";

const BASE_URL = "https://interview.enfono.com/api_bcc/api"; // Replace with your API base URL

const api = axios.create({
  baseURL: BASE_URL,
});

export const login = async (username, password) => {
  try {
    const response = await api.post("/auth/login", { username, password });
    return response.data.token;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getBanners = async (token) => {
  try {
    const response = await api.get("/banners", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
