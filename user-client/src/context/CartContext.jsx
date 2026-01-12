const placeOrder = () => {
  if (!validate()) return;

  const transactionId = "TXN" + Date.now();

  clearCart(); // ✅ CART CLEARED HERE

  navigate("/order-success", {
    state: {
      transactionId,
      total,
    },
  });
};
