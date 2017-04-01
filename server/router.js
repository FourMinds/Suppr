const Authentication = require('./controllers/authentication');
const recipeHandler = require('./controllers/recipe_handler');
const favoriteHandler = require('./controllers/favorite_handler');
const reviewHandler = require('./controllers/review_handler');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.post('/signup', Authentication.signup);
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/recipe', recipeHandler.createRecipe);
  app.get('/recipe', recipeHandler.getRecipe);
  app.get('/username', requireAuth, Authentication.getUsername);
  app.post('/review', reviewHandler.postReview)
  app.get('/review', reviewHandler.getReview)
  app.post('/favorite', favoriteHandler.postFavorite)
  app.get('/favorite', favoriteHandler.getFavorites)
}
