export default function validate(formProps) {
  const errors = {};
  if (!formProps.recipeName) {
    errors.recipeName = 'Please enter a recipe name';
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

  return errors;
}
