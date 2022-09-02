const persistence = "MONGO";
let productService;
let cartService;
switch (persistence) {
  case "MEMORY":
    const { default: MemProduct } = await import("./MemoryDAO/Products.js");
    const { default: MemCart } = await import("./MemoryDAO/Carts.js");
    productService = new MemProduct();
    cartService = new MemCart();
    break;
  case "MONGO":
    const { default: MongoProduct } = await import("./MongoDAO/Products.js");
    const { default: MongoCart } = await import("./MongoDAO/Carts.js");
    productService = new MongoProduct();
    cartService = new MongoCart(); //Esto estaria mal, aca tendriamos que traerlo desde capaz el mismo archivo, capaz desde otro distinto pero si tendriamos que crear el archivo carts.js en vez de traerlo desde el products.js como esta ahora.
    break;
  case "FileSystem":
    const { default: FSProduct } = await import("./FileSystemDAO/Products.js");
    const { default: FSCart } = await import("./FileSystemDAO/Carts.js");
    productService = new FSProduct();
    cartService = new FSCart();
    break;
}

const services = {
  productService,
  cartService,
};

export default services;
