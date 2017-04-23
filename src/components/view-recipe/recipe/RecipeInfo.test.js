import React from 'react';
import { shallow } from 'enzyme';
import { RecipeInfo } from './RecipeInfo';
import { createRecipeState } from '../../../test/test_state';

describe('Recipe Info', () => {
  const recipeInfo = shallow(<RecipeInfo recipe={createRecipeState.recipes.selectedRecipe}/>);
  const expectedRecipe = createRecipeState.recipes.selectedRecipe;

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
    let click = recipeInfo.find('.flex-body-ingredients').first().childAt(0);
    expect(click.html().includes('oval')).toEqual(true);

    click.simulate('click', {target: {name: 0}});

    let clicked = recipeInfo.find('.flex-body-ingredients').first().childAt(0);
    expect(clicked.html().includes('success')).toEqual(true);
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
