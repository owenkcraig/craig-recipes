const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const userRouter = require('./api/routes/users/userRoutes');
const recipesRouter = require('./api/routes/recipes/recipesRoutes');

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/recipe-app';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/recipes', recipesRouter);

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

mongoose
  .connect(MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server is running.');
    });
  })
  .catch((err) => console.log(err));