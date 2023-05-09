const {
  createRecipeDb,
  getRecipeDetail,
  getRecipeByName,
  getAllRecipes,
} = require("../controllers/recipeController");

const searchHandler = async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      const recipeByName = await getRecipeByName(name);
      res.status(200).json(recipeByName);
    } else {
      const allRecipes = await getAllRecipes();
      res.status(200).json(allRecipes);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const detailsHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "bdd" : "api";

  try {
    const response = await getRecipeDetail(id, source);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createHandler = async (req, res) => {
  const { name, image, summary, health_score, steps } = req.body;

  try {
    const response = await createRecipeDb(
      name,
      image,
      summary,
      health_score,
      steps
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { detailsHandler, searchHandler, createHandler };
