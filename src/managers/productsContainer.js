import fs from "fs";
import __dirname from "../utils.js";
import { v4 as uuid } from "uuid";

const path = __dirname + "/files/items.json";
class Container {
  getAll = async () => {
    try {
      if (fs.existsSync(path)) {
        let fileData = await fs.promises.readFile(path, "utf8");
        let items = JSON.parse(fileData);
        return items;
      } else {
        return [];
      }
    } catch (error) {
      console.log("Cannot read File : " + error);
    }
  };

  save = async (product) => {
    try {
      let products = await this.getAll();
      if (products.length === 0) {
        product.id = 1;
        product.date = new Date(Date.now()).toLocaleDateString();
        product.code = uuid();
        products.push(product);
        await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));
        console.log(`El id del product agregado es el "${product.id}"`);
        console.log(products);
      } else {
        product.id = products[products.length - 1].id + 1;
        product.date = new Date(Date.now()).toLocaleDateString();
        product.code = uuid();
        products.push(product);
        await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));
        console.log(
          `El id del product agregado es el "${product.id}", products:`
        );
      }
    } catch (error) {
      console.log("Cannot write file: " + error);
    }
  };

  getById = async (id) => {
    try {
      let products = await this.getAll();
      let product = null;
      for (const item of products) {
        if (item.id === id) {
          product = item;
        }
      }
      return product;
    } catch (error) {
      console.log("Product manager error, getProductById()");
      console.log(error);
    }
  };
  deleteById = async (number) => {
    try {
      let items = await this.getAll();
      let findItem = items.find((item) => item.id == number);
      let newItems = items.filter((item) => item.id != number);
      if (findItem) {
        await fs.promises.writeFile(path, JSON.stringify(newItems, null, "\t"));
        console.log("Se ha eliminado el siguiente item: ");
        console.log(findItem);
      } else {
        console.log(`El id "${number}" no existe!`);
      }
    } catch (error) {
      console.log("Cannot delete item: " + error);
    }
  };

  deleteAll = async () => {
    try {
      let items = await this.getAll();
      items = [];
      await fs.promises.writeFile(path, JSON.stringify(items, null, "\t"));
      console.log("Se han eliminado todos los items");
    } catch (error) {}
  };

  update = async (obj, id) => {
    let allProducts = await this.getAll();
    allProducts.map(function (item) {
      if (item.id == id) {
        console.log("Entro aca");
        item.title = obj.title;
        item.price = obj.price;
        item.thumbnail = obj.thumbnail;
        item.description = obj.description;
        item.stock = obj.stock;
      }
    });
    await fs.promises.writeFile(path, JSON.stringify(allProducts, null, "\t"));
    return allProducts;
  };
}

export default Container;
