const express = require('express')
const { getRecipesByUser, createRecipe, getRecipeById, updateRecipeById } = require('./recipesService');
const { verifyToken } = require('../../middleware/verifyToken');

const router = express.Router();
router.use(verifyToken);
router.route('/')
  .get(async (req, res) => {
    const { user } = req;
    try {
      const recipes = await getRecipesByUser(user.id);
      console.log(recipes);
      res.json({ data: recipes });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
    }
  })
  .post(async (req, res) => {
    try {
      const { body } = req;
      if (!body.text || body.text === '') {
        res.status(400).json({ message: 'text must be provided' });
      }
      const newRecipe = {
        user: req.user.id,
        text: body.text,
      }
      const id = await createRecipe(newRecipe)
      res.json({ data: { id }});
    } catch(err) {
      console.log(err);
      res.status(500).json({ message: 'internal server error' });
    }

  });

  router.route('/:id')
    .get( async (req,res) => {
      try {
        const { params } = req;
        const recipe = await getRecipeById(params.id);
        res.json({ data: recipe })
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'internal server error '});
      }
    })
    .put(async (req, res) => {
      try {
        const { body, params, user } = req;
        if (!body.text || body.text === '') {
          res.status(400).json({ message: 'text must be provided' });
        }
        const newRecipe = await updateRecipeById({
          text: body.text,
          id: params.id,
          user: user.id,
        });
        res.json({ data: newRecipe });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'internal server error' });
      }
    });

module.exports = router;