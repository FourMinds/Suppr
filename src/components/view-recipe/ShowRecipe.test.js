import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import ShowRecipe from './ShowRecipe';
import { createRecipeStore } from '../../test/test_state';

describe('Show Recipe', () => {
  const showRecipe = mount(<Provider store={createRecipeStore}><ShowRecipe/></Provider>);

  it('shows the correct number of tags', () => {
    const listItems = showRecipe.find('li');
    expect(listItems).toHaveLength(4);
  });

  it('shows all the tags, given the correct recipe state', () => {
    createRecipeStore.getState().recipes.selectedRecipe.tags.map(current => {
    const list = showRecipe.find('ul');
    expect(list.containsMatchingElement(
      <a className="tag">{current}</a>
    )).toBeTruthy();
    });
  });

});
