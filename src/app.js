import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import __dirname from "./utils.js";

const app = express();
const server = app.listen(8080, () => console.log("Now Listening on 8080"));
const admin = true;

app.use(express.json()); //Middleware para todos porque todos necesitan leer JSON
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use(express.static(__dirname + "/public"));
