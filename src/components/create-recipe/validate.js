export default function validate(formProps) {
  console.log(formProps)
  const errors = {};
  if (!formProps.recipeName) {
    errors.recipeName = 'Please enter an recipe name';
  }
  if (!formProps.imageUrl) {
    errors.imageUrl = 'Please enter an image url';
  }
  if (isNaN(formProps.prepTime)) {
    errors.prepTime = 'Please enter number';
  }
  if (isNaN(formProps.cookTime)) {
    errors.cookTime = 'Please enter number';
  }
  if (isNaN(formProps.servings)) {
    errors.servings = 'Please enter number';
  }
  if (!formProps.prepTime) {
    errors.prepTime = 'Please enter a prep time';
  }
  if (!formProps.cookTime) {
    errors.cookTime = 'Please enter an cook time';
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
    errors.items0 = 'Please enter an item';
  }
  if (!formProps.instructions) {
    errors.instructions = 'Please enter the instructions';
  }


  return errors;
}