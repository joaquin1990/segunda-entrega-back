import Contenedor from "../managers/productsContainer.js";
const container = new Contenedor();

export default async function validatePid(req, res, next) {
  try {
    req.params.pid = parseInt(req.params.pid);
  } catch (error) {
    return res.status(400).send({ status: "error", error: "Invalid id" });
  }
  req.params.product = await container.getById(req.params.pid);
  if (req.params.product === null)
    return res
      .status(404)
      .send({ status: "error", error: "Product not found" });
  next();
}
