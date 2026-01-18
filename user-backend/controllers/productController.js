import Product from "../models/Product.js";

export const getProducts = async (req,res)=>{
  const filter = req.query.category ? { category:req.query.category } : {};
  res.json(await Product.find(filter));
};

export const addProduct = async (req,res)=>{
  await Product.create(req.body);
  res.json({ message:"Product added" });
};

export const bulkAddProducts = async (req,res)=>{
  await Product.insertMany(req.body);
  res.json({ message:"Bulk upload done" });
};
