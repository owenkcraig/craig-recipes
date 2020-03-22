const Recipes = require('./recipesModel');

exports.getRecipesByUser = async (userID) => {
  try {
    const recipes = await Recipes
    .find({ user: userID })
    .populate({ path: 'user', select: 'firstName lastName' });
    return recipes;
  } catch (err) {
    throw err;
  }
};

exports.createRecipe = async (data) => {
  try {
    const newRecipe = new Recipes(data);
    const recipe = await newRecipe.save();
    return recipe.id;
  } catch (err) {
    throw err;
  }
};

exports.getRecipeById = async (id) => {
  try {
    const recipes = await Recipes
      .findById(id)
      .populate({ path: 'user', select: 'firstName lastName' });
      console.log(recipes);
    return recipes;
  } catch (err) {
    throw err;
  }
}

exports.updateRecipeById = async (recipes) => {
  try {
    const n = await Recipes.findOne({ 
      user: recipes.user,
      _id: recipes.id,
    });
    n.text = recipes.text;
    const savedRecipe = await n.save();
    return savedRecipe;
  } catch (err) {
    throw err;
  }
}