export const getProducts = async (category) => {
  const res = await fetch(
    `http://localhost:5000/api/products?category=${category}`
  );
  return res.json();
};
