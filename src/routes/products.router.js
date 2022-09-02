import { Router } from "express";
import Contenedor from "../managers/productsContainer.js";
import services from "../dao/index.js";
import validatePid from "../middlewares/validatePid.js";

const router = Router();
const container = new Contenedor();

//GET '/api/products' -> returns all the products
// router.get("/", async (req, res) => {
//   console.log(new Date(Date.now()).toLocaleDateString());
//   let getAllProducts = await container.getAll();
//   res.send(getAllProducts);
// });
router.get("/", async (req, res) => {
  console.log("Ahora desde persistencias");
  let getAllProducts = await services.productService.getAll();
  res.send(getAllProducts);
});

//GET '/api/products' -> returns 1 product by its id
// router.get("/:id", async (req, res) => {
//   let allProducts = await container.getAll();
//   let id1 = Number(req.params.id);
//   let item = allProducts.find((item) => item.id === id1);
//   item ? res.send(item) : res.send("404 El valor pedido no existe");
// });
router.get("/:id", async (req, res) => {
  let allProducts = await services.productService.getAll();
  let id1 = Number(req.params.id);
  let item = allProducts.find((item) => item.id === id1);
  item ? res.send(item) : res.send("404 El valor pedido no existe");
});

// POST '/api/products' - recieves and adds a product
// router.post("/", async (req, res) => {
//   let product = req.body;
//   console.log(req.body);
//   res.send({ status: "succes", message: "Product Added" });
//   await container.save(product);
// });
router.post("/", async (req, res) => {
  let product = req.body;
  console.log(req.body);
  res.send({ status: "succes", message: "Product Added" });
  await services.productService.addProduct(product);
});

//PUT '/api/products/:id' -> recieves and updates a product
// router.put("/:id", validatePid, async (req, res) => {
//   let id = Number(req.params.id);
//   console.log("Console.log(req.body): " + JSON.stringify(req.body));
//   let products = await container.update(req.body, id);
//   res.send(products);
// });
router.put("/:pid", validatePid, async (req, res) => {
  let id = Number(req.params.pid);
  let products = await services.productService.update(req.body, id);
  res.send(products);
});

//DELETE '/api/products/:id' -> deletes a product by id
// router.delete("/:pid", validatePid, async (req, res) => {
//   let pid = parseInt(req.params.pid);
//   await container.deleteById(pid);
//   res.send({ status: `Product with id: ${pid} has been deleted` });
// });
router.delete("/:pid", validatePid, async (req, res) => {
  let pid = parseInt(req.params.pid);
  await services.productService.deleteById(pid);
  res.send({ status: `Product with id: ${pid} has been deleted` });
});

export default router;
