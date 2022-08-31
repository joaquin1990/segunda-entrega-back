import Container from "../managers/cartsContainer.js";
const container = new Container();

export default async function validateCid(req, res, next) {
  try {
    req.params.cid = parseInt(req.params.cid);
  } catch (error) {
    return res.status(400).send({ status: "error", error: "Invalid cart id" });
  }
  req.params.cart = await container.getCartById(req.params.cid);
  if (req.params.cart === null)
    return res.status(404).send({ status: "error", error: "Cart not found" });
  next();
}
