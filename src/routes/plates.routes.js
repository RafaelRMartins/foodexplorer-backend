const { Router } = require("express");
const PlatesController = require("../controllers/PlatesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const checkAdmin = require("../middlewares/checkAdmin");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const platesRoutes = Router();
const upload = multer(uploadConfig.MULTER)

const platesController = new PlatesController();

platesRoutes.use(ensureAuthenticated);

platesRoutes.post("/", checkAdmin, upload.single("image"), platesController.create);
platesRoutes.delete("/:id", checkAdmin, platesController.delete);
platesRoutes.put("/:id", checkAdmin, platesController.update);
platesRoutes.put("/image/:id", checkAdmin, upload.single("image"), platesController.updateImage);

module.exports = platesRoutes;