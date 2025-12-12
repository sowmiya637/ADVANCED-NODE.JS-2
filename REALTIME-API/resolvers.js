import { getProductById, getAllProducts } from "../services/productService.js";

export default {
  Query: {
    product: (_, { id }) => getProductById(id),
    products: () => getAllProducts()
  }
};
