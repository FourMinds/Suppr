import React from 'react';
import { shallow } from 'enzyme';
import { RecipeStats } from './RecipeStats';
import { createRecipeState } from '../../../test/test_state';

describe('Recipe Stats', () => {
  const recipeStats = shallow(<RecipeStats recipe={createRecipeState.recipes.selectedRecipe} />);

  const expectedRecipeInfo = createRecipeState.recipes.selectedRecipe;
  const stats = recipeStats.find('.recipe-stats-box-column-row');

  it('shows images before each stat', () => {
    let images = recipeStats.find('img');

    images.map(image => {
      expect(image.parent().childAt(1).text()).toBeDefined();
    });

    expect(images).toHaveLength(4);
  });

  it('correctly shows the prep time', () => {
    const expectedPrepTime = expectedRecipeInfo.prepTime;
    expect(stats.containsMatchingElement(
      <div>Prep<br />{expectedPrepTime} min</div>
    )).toBeTruthy();
  });

  it('correctly shows the cook time', () => {
    const expectedCookTime = expectedRecipeInfo.cookTime;
    expect(stats.containsMatchingElement(
      <div>Cook<br />{expectedCookTime} min</div>
    )).toBeTruthy();
  });

  it('correctly shows the servings', () => {
    const expectedServings = expectedRecipeInfo.servings;
    expect(stats.containsMatchingElement(
      <div>Serves<br />{expectedServings}</div>
    )).toBeTruthy();
  });

  it('correctly shows the difficulty', () => {
    const expectedDifficulty = expectedRecipeInfo.difficulty;
    expect(stats.containsMatchingElement(
      <div>Skill<br />{expectedDifficulty}</div>
    )).toBeTruthy();
  });

});