import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

/* ==========================
   REQUEST INTERCEPTOR
========================== */
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

/* ==========================
   RESPONSE INTERCEPTOR
========================== */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data?.message?.toLowerCase().includes("expired")
    ) {
      localStorage.removeItem("adminToken");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default API;
