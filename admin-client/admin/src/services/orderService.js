const API = "http://localhost:5000/api/orders";

export const getOrders = async () => {
  const res = await fetch(API, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  return res.json();
};
