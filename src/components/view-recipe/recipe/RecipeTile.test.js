import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import RecipeTile from './RecipeTile';
import { createRecipeStore } from '../../../test/test_state';

describe ('Recipe Tile', () => {
  const recipeTile = mount(<Provider store={createRecipeStore}><RecipeTile/></Provider>);
  
  it('correctly shows the recipe name', () => {
    let recipeTitle = recipeTile.find('.recipe-title-box').text();
    let expectedRecipeTitle = createRecipeStore.getState().recipes.selectedRecipe.recipeName;
    expect(recipeTitle).toEqual(expectedRecipeTitle);
  });

});