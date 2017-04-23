import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import AuthorTile from './AuthorTile';
import { createRecipeStore } from '../../test/test_state';

describe('Author Tile', () => {
  const authorTile = mount(<Provider store={createRecipeStore}><AuthorTile username="Bluzkry"/></Provider>);

  it('renders the author name', () => {
    const authorName = authorTile.find('.author-name').text();
    const expectedAuthorName = createRecipeStore.getState().recipes.selectedRecipe.username;

    expect(authorName).toEqual(expectedAuthorName);
  });

  it('renders the author statistics', () => {
    const recipesCount = authorTile.find('[title="recipes"]').parent().last().text();
    const sporksCount = authorTile.find('[title="sporks"]').parent().last().text();
    const followersCount = authorTile.find('[title="followers"]').parent().last().text();
    const favoritesCount = authorTile.find('[title="likes"]').parent().last().text();

    const expectedAuthorName = createRecipeStore.getState().recipes.selectedRecipe.username;
    const expectedRecipesCount = createRecipeStore.getState().userInfo[expectedAuthorName].recipesCount;
    const expectedSporksCount = createRecipeStore.getState().userInfo[expectedAuthorName].sporksCount;
    const expectedFollowersCount = createRecipeStore.getState().userInfo[expectedAuthorName].followersCount;
    const expectedFavoritesCount = createRecipeStore.getState().userInfo[expectedAuthorName].favoritesCount;

    expect(recipesCount).toEqual(expectedRecipesCount.toString());
    expect(sporksCount).toEqual(expectedSporksCount.toString());
    expect(followersCount).toEqual(expectedFollowersCount.toString());
    expect(favoritesCount).toEqual(expectedFavoritesCount.toString());
  });

});
