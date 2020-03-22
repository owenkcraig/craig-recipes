import React, { useState, useEffect } from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { getToken } from './utils/token';
const useStyles = makeStyles(theme => ({
  content: {
    padding: theme.spacing(8, 0, 6),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  buttonField: {
    marginTop: theme.spacing(1),
  },
}))
export default function RecipeForm (props) {
  const classes = useStyles()
  const [ recipe, updateRecipe ] = useState('');
  const [ error, updateError ] = useState(undefined);
  async function getRecipeById(id) {
    try {
      const token = getToken();
      const response = await fetch(`/api/recipes/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      updateRecipe(data.data.text);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getRecipeById(props.match.params.id);
  }, [props.match.params.id]);
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const token = getToken();
      const updateId = props.match.params.id
      const url = updateId ? `/api/recipes/${updateId}` : '/api/recipes';
      const method = updateId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: recipe }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      props.history.push('/');
    } catch (err) {
      updateError(err.message);
    }
  }
  return (
    <Container className={classes.content} maxWidth='md'>
      <form onSubmit={handleSubmit}>
        <div>
          {error && <Typography color="error">{error}</Typography>}
          <Typography component='h6' variant='h6' align='left' color='textPrimary'>
            Add a Recipe
          </Typography>
        </div>
        <div>
          <TextField
            id='standard-multiline-flexible'
            label='Recipe text'
            multiline
            rowsMax='2'
            className={classes.textField}
            margin='normal'
            value={recipe}
            onChange={(e) => {updateRecipe(e.target.value);}}
          />
        </div>
        <Button
          color="primary"
          type="submit"
        >
          Add Recipe
        </Button>
      </form>
    </Container>
  )
}