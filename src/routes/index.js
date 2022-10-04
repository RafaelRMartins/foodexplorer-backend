const { Router } = require("express");

const usersRouter = require("./users.routes");
const platesRouter = require("./plates.routes");
const getPlates = require("./getPlates.routes");
const ingredientsRouter = require("./ingredients.routes");
const favorite = require("./favorite.routes");
const carts = require("./carts.routes");
const sessionsRouter = require("./sessions.routes");

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/plates", platesRouter);
routes.use("/getplates", getPlates);
routes.use("/ingredients", ingredientsRouter);
routes.use("/favorite", favorite);
routes.use("/carts", carts);
routes.use("/sessions", sessionsRouter);

module.exports = routes;