import React from 'react';
import { shallow } from 'enzyme';
import { RecipeTile } from './RecipeTile';
import { createRecipeState } from '../../../test/test_state';

describe('Recipe Tile', () => {
  const recipeTile = shallow(<RecipeTile
    recipe={createRecipeState.recipes.selectedRecipe}
    username={createRecipeState.auth.username}
    favorites={createRecipeState.favorites}
    reviews={createRecipeState.reviews.data}
  />);
  let expectedRecipe = createRecipeState.recipes.selectedRecipe;
  
  it('correctly shows the recipe name', () => {
    let recipeTitle = recipeTile.find('.recipe-title-box').text();
    expect(recipeTitle).toEqual(expectedRecipe.recipeName);
  });

  it('attempts to render the recipe image', () => {
    let recipeImage = recipeTile.find('.food-img').get(0).props.style;
    expect(recipeImage).toHaveProperty('backgroundImage', `url("${expectedRecipe.imageUrl}")`);
  });

});