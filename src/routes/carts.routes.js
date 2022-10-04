const { Router } = require("express");
const CartsController = require("../controllers/CartsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const checkAdmin = require("../middlewares/checkAdmin");

const cartsRoutes = Router();

const cartsController = new CartsController();

cartsRoutes.use(ensureAuthenticated);

cartsRoutes.post("/", cartsController.create)
cartsRoutes.get("/admin", checkAdmin, cartsController.index)
cartsRoutes.put("/", checkAdmin, cartsController.update)
cartsRoutes.get("/", cartsController.show)
cartsRoutes.post("/value", cartsController.showValue)

module.exports = cartsRoutes;