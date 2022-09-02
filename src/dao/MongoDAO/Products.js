import mongoose from "mongoose";
import MongoDBContainer from "./MongoDBContainer.js";
import { v4 as uuid } from "uuid";

const collection = "products";
const productsSchema = mongoose.Schema({
  title: String,
  price: Number,
  thumbnail: String,
  description: String,
  stock: Number,
  date: String,
  code: String,
});
export default class Products extends MongoDBContainer {
  constructor() {
    super(collection, productsSchema);
  }

  //Add a new product
  addProduct = async (product) => {
    product.code = uuid();
    let result = await this.save(product);
    return result;
  };
}
