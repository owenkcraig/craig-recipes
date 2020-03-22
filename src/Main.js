import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import NoteIcon from '@material-ui/icons/Note';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  Route,
  Switch,
} from 'react-router-dom';

import RecipeList from './RecipeList';
import Footer from './Footer';
import RecipeForm from './RecipeForm';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));

export default function Album() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <NoteIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Recipes App
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Switch>
          <Route exact path="/" component={RecipeList}/>
          <Route path="/recipe/edit/:id" component={RecipeForm} />
          <Route path="/recipe/create" component={RecipeForm} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}
