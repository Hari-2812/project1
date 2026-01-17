// admin-client/admin/src/services/productService.js

const API = "http://localhost:5000/api/products";

/* GET ALL PRODUCTS */
export const getProducts = async () => {
  const res = await fetch(API);
  return res.json();
};

/* ADD SINGLE PRODUCT */
export const addProduct = async (product) => {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    body: JSON.stringify(product),
  });

  return res.json();
};

/* BULK UPLOAD PRODUCTS */
export const bulkUpload = async (products) => {
  const res = await fetch(`${API}/bulk`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },
    body: JSON.stringify(products),
  });

  return res.json();
};
