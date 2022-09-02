import fs from "fs";
import __dirname from "../../utils.js";

const path = __dirname + "/files/items.json";
export default class FSContainer {
  constructor() {}
  getAll = async () => {
    console.log("entra aca?2");
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
