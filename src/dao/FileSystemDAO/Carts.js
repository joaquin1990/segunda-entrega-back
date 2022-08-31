import fs from "fs";
import FSContainer from "./FSContainer.js";
import __dirname from "../../utils.js";

const path = __dirname + "/files/carts.json";
export default class Carts extends FSContainer {
  // GET all carts:
  getAll = async () => {
    try {
      if (fs.existsSync(path)) {
        let fileData = await fs.promises.readFile(path, "utf8");
        let carts = JSON.parse(fileData);
        return carts;
      } else {
        return [];
      }
    } catch (error) {
      console.log("Cannot read File : " + error);
    }
  };
  // cart.timestamp = new Date(Date.now()).toLocaleDateString();
  // POST Add new cart:
  save = async () => {
    try {
      let carts = await this.getAll();
      let cart = {};
      if (carts.length === 0) {
        cart.id = 1;
        cart.products = [];
        cart.timestamp = new Date(Date.now()).toLocaleDateString();
        carts.push(cart);
        await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
        console.log(`El id del cart agregado es el "${cart.id}", carts:`);
        console.log(carts);
      } else {
        cart.id = carts[carts.length - 1].id + 1;
        cart.products = [];
        cart.timestamp = new Date(Date.now()).toLocaleDateString();
        carts.push(cart);
        await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
        console.log(`El id del cart agregado es el "${cart.id}", carts:`);
      }
    } catch (error) {
      console.log("Cannot write cart file: " + error);
    }
  };

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

  deleteById = async (number) => {
    try {
      let carts = await this.getAll();
      let findCart = carts.find((cart) => cart.id == number);
      let newCarts = carts.filter((cart) => cart.id != number);
      if (findCart) {
        await fs.promises.writeFile(path, JSON.stringify(newCarts, null, "\t"));
        console.log("Se ha eliminado el siguiente cart: ");
        console.log(findCart);
      } else {
        console.log(`El id "${number}" no existe!`);
      }
    } catch (error) {
      console.log("Cannot delete cart: " + error);
    }
  };

  // POST add products to cart by its id
  update = async (obj, id) => {
    let allProducts = await this.getAll();
    allProducts.map(function (item) {
      if (item.id == id) {
        item.title = obj.title;
        item.price = obj.price;
        item.thumbnail = obj.thumbnail;
      }
    });
    await fs.promises.writeFile(path, JSON.stringify(allProducts, null, "\t"));
    return allProducts;
  };

  addProductsToCart = async (req) => {
    try {
      let cid = Number(req.params.cid);
      let products = await this.getProductsByCid(cid);
      let carts = await this.getAll();
      let findedProduct = products.find(
        (product) => Number(product.id) === Number(req.body.id)
      );
      let findedCart = carts.find((cart) => Number(cart.id) == cid);
      if (findedProduct) {
        let findedProductQuantity = findedProduct.quantity;
        findedProduct.quantity = (
          Number(findedProductQuantity) + Number(req.body.quantity)
        ).toString();
        findedCart.products = products;
        await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
      } else {
        console.log(`El id "${req.body.id}" no corresponde a ningun producto!`);
        // findedCart.products.push(req.body);
        // await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
      }
    } catch (error) {
      console.log("No se pudo agregar el producto al carrito: " + error);
    }
  };

  getCartById = async (id) => {
    try {
      let carts = await this.getAll();
      let cart = null;
      for (const item of carts) {
        if (item.id === id) {
          return item;
        }
      }
      return cart;
    } catch (error) {
      console.log("Cart container error, getCartById()");
      console.log(error);
    }
  };
}
