import redisClient from "./redisClient.js";
import Product from "../models/productModel.js";

export const getProductById = async (id) => {
  const cacheKey = `product:${id}`;

  // Check cache
  const cached = await redisClient.get(cacheKey);

  if (cached) {
    console.log(" Cache Hit");
    return JSON.parse(cached);
  }

  console.log(" DB Hit");

  const product = Product.getById(id);

  if (product) {
    await redisClient.set(cacheKey, JSON.stringify(product), { EX: 60 });
  }

  return product;
};

export const getAllProducts = async () => {
  return Product.getAll();
};
