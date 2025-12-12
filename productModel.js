import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data/products.json");

export default {
  getAll() {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  },

  getById(id) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data).find((p) => p.id == id);
  }
};
