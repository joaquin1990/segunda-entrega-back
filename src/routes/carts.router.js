import { Router } from "express";
import Container from "../managers/cartsContainer.js";
import Carts from "../dao/FileSystemDAO/Carts.js";
import services from "../dao/index.js";
import validateCid from "../middlewares/validateCid.js";
import validatePid from "../middlewares/validatePid.js";

const router = Router();
const container = new Container();

//GET "/" -> returns all the carts
// router.get("/", async (req, res) => {
//   let getAllCarts = await container.getAll();
//   res.send(getAllCarts);
// });
router.get("/", async (req, res) => {
  console.log("entra aca?");
  let getAllCarts = await services.cartService.getAll();
  res.send(getAllCarts);
});

// GET "/:cid/products" - returns all products from cart
// router.get("/:cid/products", validateCid, async (req, res) => {
//   try {
//     let cid = Number(req.params.cid);
//     let products = await container.getProductsByCid(cid);
//     res.send({ products });
//   } catch (error) {
//     return res
//       .status(500)
//       .send({ status: "error", error: "Products couldn't be shown" });
//   }
// });
router.get("/:cid/products", validateCid, async (req, res) => {
  try {
    let cid = Number(req.params.cid);
    let products = await services.cartService.getProductsByCid(cid);
    res.send({ products });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", error: "Products couldn't be shown" });
  }
});

//POST "/" - recieves and adds a cart
// router.post("/", async (req, res) => {
//   let cart = req.body;
//   res.send({ status: "succes", message: "Cart Added" });
//   await container.save(cart);
// });
router.post("/", async (req, res) => {
  res.send({ status: "succes", message: "Cart Added" });
  await services.cartService.newCart();
});

// POST "/:cid/products" - Add products to a specific cart (cid)
// Hay que mandarle en el req.body un objeto con el id del producto y la quantity
router.post("/:cid/products", validateCid2, async (req, res) => {
  const { id, quantity } = req.body;
  if (!id || !quantity) {
    return res
      .status(300)
      .send({ status: "error", error: "blank spaces are NOT allowed" });
  } else {
    try {
      await services.cartService.addProductToCart(
        req.params.cid,
        id,
        parseInt(quantity)
      );
      res.send({
        status: "success",
        message: "successfully saved into the cart",
      });
    } catch (error) {
      return res.status(500).send({
        status: "error",
        error: "it couldn't upload the product into the cart",
      });
    }
  }
});

//DELETE "/:cid" - deletes a carts by its id
router.delete("/:cid", async (req, res) => {
  let cid = req.params.cid;
  console.log("entro aca");
  await services.cartService.deleteById(cid);
  res.send({ status: `Cart with id '${cid}' has been deleted` });
});

// DELETE "/:cid/products/:pid" - Delete a product by its id in a cart located by its id.
router.delete("/:cid", validateCid2, async (req, res) => {
  try {
    console.log("Entra aca?2");
    await services.cartService.deleteById(req.params.cid);
    res.send({ status: "success", message: "successfully deleted" });
  } catch (error) {
    return res
      .status(500)
      .send({ status: "error", error: "cart couldn't been deleted" });
  }
});

async function validateCid2(req, res, next) {
  try {
    req.params.cart = await services.cartService.getById(req.params.cid);
  } catch (error) {
    return res.status(300).send({ status: "error", error: "Invalid id" });
  }
  if (!req.params.cart)
    return res.status(404).send({ status: "error", error: "Cart not found" });
  next();
}

async function validatePid2(req, res, next) {
  req.params.product = await services.productService.getById(req.params.pid);
  if (!req.params.product)
    return res
      .status(404)
      .send({ status: "error", error: "Product not found" });
  next();
}

export default router;
