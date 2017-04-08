export default function validate(formProps) {
  console.log(formProps)
  const errors = {};
  if (!formProps.recipeName) {
    errors.recipeName = 'Sorry! We can\'t submit your recipe without knowing the name';
  }
  if (!formProps.imageUrl) {
    errors.imageUrl = 'Sorry! We can\'t submit your recipe without a picture.';
  }
  if (isNaN(formProps.prepTime)) {
    errors.prepTime = 'Sorry! We need prep time to be a number';
  }
  if (isNaN(formProps.cookTime)) {
    errors.cookTime = 'Sorry! We need cook time to be a number.';
  }
  if (isNaN(formProps.servings)) {
    errors.servings = 'Sorry! We need servings to be a number.';
  }
  if (!formProps.prepTime) {
    errors.prepTime = 'Sorry! We can\'t submit your recipe without knowing the prep time';
  }
  if (!formProps.cookTime) {
    errors.cookTime = 'Sorry! We can\'t submit your recipe without knowing the cook time';
  }
  if (!formProps.servings) {
    errors.servings = 'Sorry! We can\'t submit your recipe without knowing the number of servings';
  }
  if (formProps.difficulty === "Choose...") {
    errors.difficulty = 'Sorry! We can\'t submit your recipe without choosing a difficulty';
  }
  if (!formProps.description) {
    errors.description = 'Sorry! We can\'t submit your recipe without knowing the description';
  }
  if (!formProps.quantity0) {
    errors.quantity0 = 'Sorry! We can\'t submit your recipe without any quantities';
  }
  if (!formProps.items0) {
    errors.items0 = 'Sorry! We can\'t submit your recipe without any items';
  }
  if (!formProps.instructions) {
    errors.instructions = 'Sorry! We can\'t submit your recipe without knowing the instructions';
  }

  return errors;
}
