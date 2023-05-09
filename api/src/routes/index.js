const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { detailsRoute, searchRoute, createRoute } = require("./recipeRoute.js");
const dietsRoute = require("./dietsRoute.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const routes = Router();

routes.use("/recipes", detailsRoute);
routes.use("/recipes", searchRoute);
routes.use("/recipes", createRoute);
routes.use("/diets", dietsRoute);

module.exports = routes;
