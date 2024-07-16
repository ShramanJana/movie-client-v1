import axios from "axios";
import { getJwtToken } from "./auth/LoginUtil";

export default axios.create({
  baseURL: "http://localhost:8080/",
  // headers: {"Access-Control-Allow-Origin": "http://localhost:3000"}
});

export const privateAxios = axios.create({
  baseURL: "http://localhost:8080/",
  // headers: {"Access-Control-Allow-Origin": "http://localhost:3000"}
});

// private axios for authenticated service calls
privateAxios.interceptors.request.use(
  (config) => {
    const token = getJwtToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
  },
  (error) => Promise.reject(error)
);
