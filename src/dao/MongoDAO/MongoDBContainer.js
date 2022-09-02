import mongoose from "mongoose";

export default class MongoDBContainer {
  constructor(collection, schema) {
    mongoose.connect(
      "mongodb+srv://joaquingarese:1a2b3c@testback.b3qwb1m.mongodb.net/?retryWrites=true&w=majority"
    );
    this.model = mongoose.model(collection, schema);
  }

  getAll = async () => {
    let data = await this.model.find();
    return data;
  };

  save = async (element) => {
    console.log(element);
    let result = await this.model.create(element);
    return result;
  };

  getById = async (id) => {
    console.log("hola");
    let result = await this.model.findOne({ _id: id });
    console.log(result);
    return result;
  };

  deleteById = async (id) => {
    console.log("Entra aca?");
    await this.model.deleteOne({ _id: id });
  };

  update = async (object) => {
    console.log(object, "object");
    let id = object.id ? object.id : object_id;
    await this.model.updateOne({ _id: id }, { $set: object });
  };

  editById = async (id, document) => {
    let results = await this.model.findOneAndUpdate({ _id: id }, document);

    return results;
  };

  deleteAll = async () => {
    await this.model.deleteAll();
  };
}
