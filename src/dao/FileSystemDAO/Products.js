import FSContainer from "./FSContainer.js";
import fs from "fs";
import { v4 as uuid } from "uuid";
import __dirname from "../../utils.js";

// const path = __dirname + "/files/items.json";
export default class Products extends FSContainer {
  constructor() {
    super();
    this.path = __dirname + "/files/items.json";
  }

  //Add a new product
  addProduct = async (product) => {
    let data = await this.getAll();
    if (data.length === 0) {
      product.id = 1;
      product.code = uuid();
      product.date = new Date(Date.now()).toLocaleDateString();
      this.save(product);
      return product.id;
    } else {
      product.id = data[data.length - 1].id + 1;
      product.code = uuid();
      product.date = new Date(Date.now()).toLocaleDateString();
      this.save(product);
      return product.id;
    }
  };
}
