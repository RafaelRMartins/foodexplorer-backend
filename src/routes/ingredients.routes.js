const { Router } = require("express");
const IngredientsController = require("../controllers/IngredientsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const checkAdmin = require("../middlewares/checkAdmin");
const multer = require("multer");
const uploadConfig = require("../configs/upload");


const ingredientsRoutes = Router();
const upload = multer(uploadConfig.MULTER)

const ingredientsController = new IngredientsController();

ingredientsRoutes.use(ensureAuthenticated);
ingredientsRoutes.use(checkAdmin);

ingredientsRoutes.post("/", upload.single("image"), ingredientsController.create);
ingredientsRoutes.delete("/:id", ingredientsController.delete);
ingredientsRoutes.get("/", ingredientsController.index);
ingredientsRoutes.get("/:id", ingredientsController.show);
ingredientsRoutes.put("/:id", ingredientsController.update);
ingredientsRoutes.put("/image/:id", upload.single("image"), ingredientsController.updateImage);

module.exports = ingredientsRoutes;