const Authentication = require('./controllers/authentication');
const recipeHandler = require('./controllers/recipe_handler');
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
}
