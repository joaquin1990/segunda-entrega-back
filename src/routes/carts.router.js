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
router.post("/:cid/products", validateCid, async (req, res) => {
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
        Number(quantity)
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
  await container.deleteById(cid);
  res.send({ status: `Cart with id '${cid}' has been deleted` });
});
export default router;

// DELETE "/:cid/products/:pid" - Delete a product by its id in a cart located by its id.
router.delete("/:cid/products/:pid", async (req, res) => {
  let cid = req.params.cid;
  let pid = req.params.pid;
  await container.deleteProductInCart(cid, pid);
  res.send({
    status: `The product id:${pid} from the cart id:${cid} was deleted`,
  });
});
