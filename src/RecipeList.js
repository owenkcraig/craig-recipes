import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import RecipeCard from './RecipeCard';
import { getToken } from './utils/token';

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const cards = [1, 2, 3];

export default function RecipeList(props) {
  const classes = useStyles();
  const [ recipes, updateRecipes ] = useState([]);

  async function getRecipes() {
    try {
      const token = getToken();
      const response = await fetch('/api/recipes', {
        headers: {
          authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      updateRecipes(data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getRecipes();
  }, []);
  return (
    <div>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Add Some Recipes
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => { props.history.push('./recipe/create');}}
                >
                  New Recipe
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {
            recipes
            &&
            recipes.map(recipe => {
              return (
                <Grid
                  item
                  key={recipe._id}
                  onClick={() => { props.history.push(`/recipe/edit/${recipe._id}`) }}
                >
                  <RecipeCard  
                    text={recipe.text}
                    user={recipe.user}
                  />
                </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}