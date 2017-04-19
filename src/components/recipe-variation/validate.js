export default function validate(formProps) {
  const errors = {};
  if (!formProps.recipeName) {
    errors.recipeName = 'Please enter a recipe name';
  }
  if (formProps.recipeName && formProps.recipeName.length > 52) {
    errors.recipeName = 'The recipe name must be shorter than 52 characters';
  }
  if (!formProps.imageUrl) {
    errors.imageUrl = 'Please enter an image URL';
  }
  if (isNaN(formProps.prepTime)) {
    errors.prepTime = 'Please enter a number';
  }
  if (isNaN(formProps.cookTime)) {
    errors.cookTime = 'Please enter a number';
  }
  if (isNaN(formProps.servings)) {
    errors.servings = 'Please enter a number';
  }
  if (!formProps.prepTime) {
    errors.prepTime = 'Please enter a prep time';
  }
  if (!formProps.cookTime) {
    errors.cookTime = 'Please enter a cook time';
  }
  if (!formProps.servings) {
    errors.servings = 'Please enter the number of servings';
  }
  if (formProps.difficulty === "Choose...") {
    errors.difficulty = 'Please select a difficulty';
  }
  if (!formProps.description) {
    errors.description = 'Please enter a description';
  }
  if (!formProps.quantity0) {
    errors.quantity0 = 'Please enter a quantity';
  }
  if (!formProps.items0) {
    errors.items0 = 'Please enter an ingredient';
  }
  if (!formProps.instructions) {
    errors.instructions = 'Please enter the instructions';
  }

  if(!formProps.tags || formProps.tags < 2) {
    errors.tags = 'Sorry! We can\'t submit your recipe without knowing at least two tags.';
  }
  if (!formProps.ingredients || !formProps.ingredients.length) {
    errors.ingredients = 'At least one member must be entered'
  } else {
    const ingredientsArrayErrors = []
    formProps.ingredients.forEach((ingredient, ingredientIndex) => {
      const ingredientErrors = {}
      if (!ingredient || !ingredient.quantity) {
        ingredientErrors.quantity = 'Required'
        ingredientsArrayErrors[ingredientIndex] = ingredientErrors
      }
      if (!ingredient || !ingredient.item) {
        ingredientErrors.item = 'Required'
        ingredientsArrayErrors[ingredientIndex] = ingredientErrors
      }
      return ingredientErrors
    })
    if(ingredientsArrayErrors.length) {
      errors.ingredients = ingredientsArrayErrors
    }
  }
  return errors;
}
