import React from 'react';
import { shallow } from 'enzyme';
import { ShowRecipe } from './ShowRecipe';
import { createRecipeState } from '../../test/test_state';

describe('Show Recipe', () => {
  const showRecipe = shallow(<ShowRecipe
    recipe={createRecipeState.recipes.selectedRecipe}
    username={createRecipeState.auth.username}
    variations={createRecipeState.recipes.variations}
  />);

  it('shows the correct number of tags', () => {
    const listItems = showRecipe.find('li');
    expect(listItems).toHaveLength(4);
  });

  it('shows all the tags, given the correct recipe state', () => {
    createRecipeState.recipes.selectedRecipe.tags.map(current => {
    const list = showRecipe.find('ul');
    expect(list.containsMatchingElement(
      <a className="tag">{current}</a>
    )).toBeTruthy();
    });
  });

});
