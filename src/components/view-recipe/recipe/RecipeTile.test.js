import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import RecipeTile from './RecipeTile';
import { createRecipeStore } from '../../../test/test_state';

describe('Recipe Tile', () => {
  const recipeTile = mount(<Provider store={createRecipeStore}><RecipeTile/></Provider>);
  let expectedRecipe = createRecipeStore.getState().recipes.selectedRecipe;
  
  it('correctly shows the recipe name', () => {
    let recipeTitle = recipeTile.find('.recipe-title-box').text();
    expect(recipeTitle).toEqual(expectedRecipe.recipeName);
  });

  it('attempts to render the recipe image', () => {
    let recipeImage = recipeTile.find('.food-img').get(0).style;
    expect(recipeImage._values).toHaveProperty('background-image', `url(${expectedRecipe.imageUrl})`);
  });

});