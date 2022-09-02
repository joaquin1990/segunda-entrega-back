import mongoose from "mongoose";
import MongoDBContainer from "./MongoDBContainer.js";

const collection = "carts";
const userSchema = mongoose.Schema({
  products: Array,
  timestamp: Number,
});

export default class Users extends MongoDBContainer {
  constructor() {
    super(collection, userSchema);
  }
  addProduct = async (object, pid) => {
    let cart = await this.model.find({ _id: object[0]._id }, { products: 1 });
    let productsInCart = cart[0].products;
    let product = cart[0].products.find((item) => item.pid == pid.pid);
    let conditionalArray = [];
    conditionalArray.push(product);

    if (conditionalArray[0] == null) {
      cart[0].products.push({ pid: pid.pid, quantity: 1 });
    } else {
      product.quantity++;
    }
    await this.model.updateOne(
      { _id: object[0]._id },
      { $set: { products: productsInCart } }
    );
    // await cart.save();
    return cart;
  };
  deleteProduct = async (object, pid) => {
    let cart = await this.model.find({ _id: object[0]._id }, { products: 1 });
    let productsInCart = cart[0].products;
    cart[0].products = cart[0].products.find((item) => item.pid !== pid.pid);

    await this.model.updateOne(
      { _id: object[0]._id },
      { $set: { products: cart[0].products } }
    );
    // await cart.save();
    return cart;
  };
}
