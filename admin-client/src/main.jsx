import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import axios from "axios" // Add axios for API interceptor

// // ✅ Global axios interceptor for JWT expiry handling
// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       const data = error.response.data;
      
//       // Handle expired token from your backend
//       if (data.success === false && (
//         data.message.includes('Session expired') || 
//         data.message.includes('Please login again') ||
//         data.expired === true
//       )) {
//         // Clear auth storage
//         localStorage.removeItem('token');
//         sessionStorage.removeItem('token');
        
//         // Redirect to login
//         window.location.href = '/login?sessionExpired=true';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
