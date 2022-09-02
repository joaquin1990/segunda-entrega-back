import fs from "fs";
import FSContainer from "./FSContainer.js";
import __dirname from "../../utils.js";

// const path = __dirname + "/files/carts.json";
export default class Carts extends FSContainer {
  constructor() {
    super();
    this.path = __dirname + "/files/carts.json";
  }

  newCart = async () => {
    let data = await this.getAll();
    let cart = {};
    if (data.length === 0) {
      cart.id = 1;
      cart.date = new Date(Date.now()).toLocaleDateString();
    } else {
      cart.id = data[data.length - 1].id + 1;
      cart.date = new Date(Date.now()).toLocaleDateString();
    }
    cart.products = [];
    await this.save(cart);
    return cart.id;
  };

  // Listo
  // GET all products from a cart by its cid
  getProductsByCid = async (cid) => {
    try {
      const allCarts = await this.getAll();
      let findedCart = allCarts.find((cart) => {
        if (cart["id"] == cid) {
          return cart;
        }
      });
      let products = findedCart["products"];
      return products;
    } catch (error) {
      console.log("Hay un error: " + error);
    }
  };

  // Listo
  //  DELETE a product by its cid and pid:
  deleteProductInCart = async (cid, pid) => {
    const allCarts = await this.getAll();
    let findCart = allCarts.find((cart) => {
      if (cart["id"] == cid) {
        return cart;
      }
    });
    findCart["products"] = findCart["products"].filter((product) => {
      return product["id"] != pid;
    });
    console.log(findCart);
    await fs.promises.writeFile(path, JSON.stringify(allCarts, null, "\t"));
    return allCarts;
  };

  addProductToCart = async (cid, pid, qty) => {
    let cart = await this.getById(cid);
    if (cart.products.some((e) => e.id === pid)) {
      for (const item of cart.products) {
        if (item.id === pid) {
          let condition = Number(item.quantity) + qty;
          if (condition < 1) {
            item.quantity = 1;
          } else {
            item.quantity = condition.toString();
          }
        }
      }
    } else {
      if (qty < 1) {
        throw new Error("Cart manager error:{addProductCart} invalid quantity");
      } else {
        cart.products.push({ id: pid, quantity: qty });
      }
    }
    await this.update(cart);
  };
}
