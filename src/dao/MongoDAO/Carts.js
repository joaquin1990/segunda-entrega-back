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

  deleteProductFromCart = async (cid, pid) => {
    let cart = await this.getById(cid);

    let newCartProduts = [];

    if (cart.products.some((e) => e.id === pid)) {
      for (const item of cart.products) {
        if (item.id === pid) {
          continue;
        }
        newCartProduts.push(item);
      }
      cart.products = newCartProduts;
      this.update(cart);
    }
  };

  // GET all products from a cart by its cid
  getProductsByCid = async (cid) => {
    try {
      const allCarts = await this.getAll();
      let findedCart = allCarts.find((cart) => {
        if (cart["_id"] == cid) {
          return cart;
        }
      });
      let products = findedCart["products"];
      return products;
    } catch (error) {
      console.log("Hay un error: " + error);
    }
  };
}
