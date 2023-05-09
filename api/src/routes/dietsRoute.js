const { Router } = require("express");
const dietsRoute = Router();
const dietsHandler = require("../handlers/dietsHandler");

dietsRoute.get("/", dietsHandler);

module.exports = dietsRoute;
