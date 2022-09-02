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
  newCart = async () => {
    let cart = {};
    let result = await this.save(cart);
    return result;
  };

  // addProductToCart = async (object, pid) => {
  //   let cart = await this.model.find({ _id: object[0]._id }, { products: 1 });
  //   let productsInCart = cart[0].products;
  //   let product = cart[0].products.find((item) => item.pid == pid.pid);
  //   let conditionalArray = [];
  //   conditionalArray.push(product);

  //   if (conditionalArray[0] == null) {
  //     cart[0].products.push({ pid: pid.pid, quantity: 1 });
  //   } else {
  //     product.quantity++;
  //   }
  //   await this.model.updateOne(
  //     { _id: object[0]._id },
  //     { $set: { products: productsInCart } }
  //   );
  //   return cart;
  // };

  addProductToCart = async (cid, pid, qty) => {
    let cart = await this.getById(cid);
    if (!cart.products) {
      console.log("entro al if");
      if (qty < 1) {
        throw new Error("Cart manager error:{addProductCart} invalid quantity");
      } else {
        cart.products.push({ id: pid, quantity: qty });
      }
    } else {
      if (cart.products.some((e) => e.id === pid)) {
        for (const item of cart.products) {
          if (item.id === pid) {
            let condition = (item.quantity += qty);
            if (condition < 1) {
              item.quantity = 1;
            } else {
              item.quantity = condition;
            }
          }
        }
      } else {
        if (qty < 1) {
          throw new Error(
            "Cart manager error:{addProductCart} invalid quantity"
          );
        } else {
          cart.products.push({ id: pid, quantity: qty });
        }
      }
    }
    await this.update(cart);
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
