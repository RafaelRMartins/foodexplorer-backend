const { Router } = require("express");
const GetPlatesController = require("../controllers/GetPlatesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const platesRoutes = Router();

const getPlatesController = new GetPlatesController();

platesRoutes.use(ensureAuthenticated);

platesRoutes.get("/", getPlatesController.index);
platesRoutes.get("/getfavorite", getPlatesController.getFavorite);
platesRoutes.get("/gethomeplate", getPlatesController.getHomePlate);
platesRoutes.get("/:id", getPlatesController.show);

module.exports = platesRoutes;