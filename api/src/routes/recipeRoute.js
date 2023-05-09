const { Router } = require("express");
const detailsRoute = Router();
const createRoute = Router();
const searchRoute = Router();
const {
  detailsHandler,
  createHandler,
  searchHandler,
} = require("../handlers/recipeHandler");

detailsRoute.get("/:id", detailsHandler);
createRoute.post("/", createHandler);
searchRoute.get("/", searchHandler);

module.exports = { detailsRoute, createRoute, searchRoute };
