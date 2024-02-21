import axios from "axios";
import { checkAuth } from "../utils/auth";
import { ROUTES } from "../utils/routes";
import { redirect } from "react-router";

const BASE_URL = "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  if (config.url === ROUTES.home) {
    return config; // Return early
  }

  try {
    const { token } = checkAuth();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.log(error);
    redirect(ROUTES.home);
  }
  return config;
});

export default apiClient;
