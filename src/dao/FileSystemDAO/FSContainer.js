import fs from "fs";
import __dirname from "../../utils.js";

const path = __dirname + "/files/items.json";
export default class FSContainer {
  constructor() {}
  getAll = async () => {
    try {
      if (fs.existsSync(this.path)) {
        let fileData = await fs.promises.readFile(this.path, "utf8");
        let items = JSON.parse(fileData);
        return items;
      } else {
        return [];
      }
    } catch (error) {
      console.log("Cannot read File : " + error);
    }
  };

  // save = async (product) => {
  //   try {
  //     let products = await this.getAll();

  //     if (products.length === 0) {
  //       product.id = 1;
  //       product.date = new Date(Date.now()).toLocaleDateString();
  //       product.code = uuid();
  //       products.push(product);

  //       await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));
  //       console.log(`El id del product agregado es el "${product.id}"`);
  //       console.log(products);
  //     } else {
  //       product.id = products[products.length - 1].id + 1;
  //       product.date = new Date(Date.now()).toLocaleDateString();
  //       product.code = uuid();
  //       products.push(product);

  //       await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));
  //       console.log(
  //         `El id del product agregado es el "${product.id}", products:`
  //       );
  //     }
  //   } catch (error) {
  //     console.log("Cannot write file: " + error);
  //   }
  // };
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

  // update = async (obj, id) => {
  //   let allProducts = await this.getAll();
  //   let pid = Number(id);
  //   console.log(pid, "pid");
  //   console.log(obj, "cart");
  //   console.log(allProducts, "all products");
  //   allProducts.map(function (item) {
  //     if (item.id === pid) {
  //       item.title = obj.title;
  //       item.price = obj.price;
  //       item.thumbnail = obj.thumbnail;
  //       item.description = obj.description;
  //       item.stock = obj.stock;
  //     }
  //   });
  //   await fs.promises.writeFile(path, JSON.stringify(allProducts, null, "\t"));
  //   return allProducts;
  // };

  update = async (object) => {
    let list = await this.getAll();
    let index = list.findIndex((element) => element.id === object.id);
    list[index] = object;
    await fs.promises.writeFile(this.path, JSON.stringify(list, null, "\t"));
    return true;
  };

  save = async (item) => {
    let data = await this.getAll();
    data.push(item);
    await fs.promises.writeFile(this.path, JSON.stringify(data, null, "\t"));
    return item.id;
  };
}
