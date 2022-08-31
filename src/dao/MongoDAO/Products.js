import mongoose from "mongoose";
import MongoDBContainer from "./MongoDBContainer.js";

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
}
