const trimSlash = (value = "") => value.replace(/\/+$/, "");

const getDefaultBackendUrl = () => {
  if (typeof window === "undefined") {
    return "http://localhost:5000";
  }

  const { hostname, origin } = window.location;
  const isLocalHost = hostname === "localhost" || hostname === "127.0.0.1";

  return isLocalHost ? "http://localhost:5000" : origin;
};

const configuredBaseUrl =
  import.meta.env.VITE_BACKEND_URL ||
  import.meta.env.VITE_API_URL ||
  getDefaultBackendUrl();

export const API_BASE_URL = trimSlash(configuredBaseUrl);
export const API_BASE_URL_WITH_API = `${API_BASE_URL}/api`;

export default API_BASE_URL;
