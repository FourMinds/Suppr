import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import RecipeInfo from './RecipeInfo';
import { createRecipeStore } from '../../../test/test_state';

describe('Recipe Info', () => {
  const recipeInfo = mount(<Provider store={createRecipeStore}><RecipeInfo/></Provider>);
  const expectedRecipe = createRecipeStore.getState().recipes.selectedRecipe;

  it('renders ingredients and instructions titles', () => {
    const ingredientTitle = recipeInfo.find('.ingredient-title').text();
    const instructionTitle = recipeInfo.find('.instructions-title').text();
    expect(ingredientTitle).toEqual('Ingredients:');
    expect(instructionTitle).toEqual('Instructions:');
  });

  it('correctly renders the multiple ingredients', () => {
    let ingredients = recipeInfo.find('.ingredient-item');
    const expectedIngredients = expectedRecipe.ingredients;

    ingredients.map((ingredient, index) => {
      expect(ingredient.text()).toEqual(`${expectedIngredients.quantity[index]}|${expectedIngredients.items[index]}`);
      });
  });

  it('shows a click and then hides the click when clicking an ingredient', () => {
    let notChecked = recipeInfo.find('[alt="oval"]').first();
    expect(notChecked).toBeDefined();

    recipeInfo.find('.flex-body-ingredients').first().childAt(0).simulate('click');

    const checked = recipeInfo.find('[alt="success"]').first();
    expect(checked).toBeDefined();
  });

  it('correctly renders the instructions, splitting at new lines', () => {
    let instructions = recipeInfo.find('.flex-body-instruction');
    const expectedInstructions = expectedRecipe.instructions.split('\n');

    instructions.map((instruction, index) => {
      expect(instruction.childAt(0).text()).toEqual(`${index+1}.`);
      expect(instruction.childAt(1).text()).toEqual(expectedInstructions[index]);
    });

    expect(instructions).toHaveLength(2);
  });
});
