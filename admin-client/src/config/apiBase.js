const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_BACKEND_URL ||
  "http://localhost:5000";

export const API_BASE_URL_WITH_API = `${API_BASE_URL}/api`;

export default API_BASE_URL;
