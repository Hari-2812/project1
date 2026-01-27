import Order from "../models/Order.js"

export const createOrder = async (req, res) => {
  const order = await Order.create(req.body)
  res.status(201).json(order)
}

export const getAllOrders = async (req, res) => {
  const orders = await Order.find()
  res.json(orders)
}
