const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    /* ITERATION 2:
      return Recipe.create({
      title: 'Asian Glazed Chicken Thighs',
      level: 'Amateur Chef',
      ingredients: [
        '1/2 cup rice vinegar',
        '5 tablespoons honey',
        '1/3 cup soy sauce (such as Silver Swan®)',
        '1/4 cup Asian (toasted) sesame oil',
        '3 tablespoons Asian chili garlic sauce',
        '3 tablespoons minced garlic',
        'salt to taste',
        '8 skinless, boneless chicken thighs'
      ],
      cuisine: 'Asian',
      dishType: 'main_course',
      image:
        'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
      duration: 40,
      creator: 'Chef LePapu'
    });
  })*/
    /* ITERATION 2:
  .then((recipe) => {
    console.log('Recipe was created');
    console.log(recipe.title); */
    return Recipe.insertMany(data);
  })
  .then((data) => {
    console.log('Several recipes were created');
    // console.log( { title } );  // still need to figure out

    return Recipe.findByIdAndUpdate('6000882b3f6bcf0889a453a4', {
      duration: 100 // not working
    });
  })
  .then((updatedRecipe) => {
    console.log('Recipe was updated');

    return Recipe.findOneAndDelete({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Recipe was deleted');

    return mongoose.disconnect();
  })
  .then(() => {
    console.log('Connection has been closed');
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
