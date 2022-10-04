const { Router } = require("express");
const FavoriteController = require("../controllers/FavoriteController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const favoriteRoutes = Router();

const favoriteController = new FavoriteController();

favoriteRoutes.use(ensureAuthenticated);

favoriteRoutes.post("/:plates_id", favoriteController.create)
favoriteRoutes.get("/", favoriteController.show)
favoriteRoutes.delete("/:plates_id", favoriteController.delete)

module.exports = favoriteRoutes;