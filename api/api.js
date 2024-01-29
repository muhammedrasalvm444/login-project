import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "https://dummyjson.com";

const api = axios.create({
  baseURL: BASE_URL,
});

export const login = async (username, password) => {
  console.log("iuser", username, password);
  try {
    const response = await api.post(
      "/auth/login",
      { username, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.success("you are successfully logged in");

    return response.data.token;
  } catch (error) {
    console.log("error", error);
    toast.error(error?.response?.data?.message);

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
