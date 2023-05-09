const { Recipe } = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;

const createRecipeDb = async (name, image, summary, health_score, steps) => {
  return await Recipe.create({
    name,
    image,
    summary,
    health_score,
    steps,
  });
};

const getRecipeDetail = async (id, source) => {
  const recipe =
    source === "api"
      ? (
          await axios.get(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
          )
        ).data
      : await Recipe.findByPk(id);

  return recipe;
};

const infoCleaner = (arr) =>
  arr.map((elem) => {
    return {
      id: elem.id,
      name: elem.title,
      image: elem.image,
      diets: elem.diets.map((elem) => {
        return {
          name: elem,
        };
      }),
      summary: elem.summary,
      healthScore: elem.healthScore,
      steps: elem.analyzedInstructions,
      created: false,
    };
  });

const getAllRecipes = async () => {
  const recipesDB = await Recipe.findAll();
  const infoApi = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    )
  ).data.results;
  const recipesApi = infoCleaner(infoApi);

  return [...recipesDB, ...recipesApi];
};

const getRecipeByName = async (name) => {
  const recipesDB = await Recipe.findAll({ where: { name: name } });

  const infoApi = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100&name=${name}`
    )
  ).data.results;

  const recipesApi = infoCleaner(infoApi);

  const recipeApiFiltered = recipesApi.filter((recipe) => recipe.name === name);

  return [...recipeApiFiltered, ...recipesDB];
};

module.exports = {
  createRecipeDb,
  getRecipeDetail,
  getAllRecipes,
  getRecipeByName,
};
