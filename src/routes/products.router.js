import { Router } from "express";
import Contenedor from "../managers/productsContainer.js";
import services from "../dao/index.js";
import validatePid from "../middlewares/validatePid.js";

const router = Router();
const container = new Contenedor();

//GET '/api/products' -> returns all the products

router.get("/", async (req, res) => {
  let getAllProducts = await services.productService.getAll();
  res.send(getAllProducts);
});

//GET '/api/products' -> returns 1 product by its id
router.get("/:id", async (req, res) => {
  let allProducts = await services.productService.getAll();
  let id1 = Number(req.params.id);
  let item = allProducts.find(
    (item) => (item.id ? item.id : item._id) == (id1 ? id1 : req.params.id)
  );
  console.log(item);
  item ? res.send(item) : res.send("404 El valor pedido no existe");
});

// POST '/api/products' - recieves and adds a product
router.post("/", async (req, res) => {
  let product = req.body;
  console.log(req.body);
  res.send({ status: "succes", message: "Product Added" });
  await services.productService.addProduct(product);
});

//PUT '/api/products/:id' -> recieves and updates a product
router.put("/:pid", validatePid2, async (req, res) => {
  try {
    req.body.id = req.params.pid;
    console.log(req.body);
    await services.productService.update(req.body);
    res.send({ status: "success", message: "successfully saved" });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", error: "it couldn't update the product" });
  }
});

//DELETE '/api/products/:id' -> deletes a product by id
router.delete("/:pid", validatePid2, async (req, res) => {
  try {
    await services.productService.deleteById(req.params.pid);
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", error: "it couldn't delete the product" });
  }
  res.send({ status: "success", message: "successfully deleted" });
});

async function validatePid2(req, res, next) {
  req.params.product = await services.productService.getById(req.params.pid);
  console.log(req.params.product);
  if (!req.params.product)
    return res
      .status(404)
      .send({ status: "error", error: "Product not founded" });
  next();
}

export default router;
