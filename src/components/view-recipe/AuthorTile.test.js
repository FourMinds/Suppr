import React from 'react';
import { shallow } from 'enzyme';
import { AuthorTile } from './AuthorTile';
import { createRecipeState } from '../../test/test_state';

describe('Author Tile', () => {
  const authorTile = shallow(<AuthorTile
    info={createRecipeState.userInfo}
    profile={createRecipeState.profile}
    username="Bluzkry"
  />);

  it('renders the author name', () => {
    expect(authorTile.find('.author-name').length).toEqual(1);
    const authorName = authorTile.find('.author-name').text();
    const expectedAuthorName = createRecipeState.recipes.selectedRecipe.username;

    expect(authorName).toEqual(expectedAuthorName);
  });

  it('renders the author statistics', () => {
    const recipesCount = authorTile.find('[title="recipes"]').parent().last().text();
    const sporksCount = authorTile.find('[title="sporks"]').parent().last().text();
    const followersCount = authorTile.find('[title="followers"]').parent().last().text();
    const favoritesCount = authorTile.find('[title="likes"]').parent().last().text();

    const expectedAuthorName = createRecipeState.recipes.selectedRecipe.username;
    const expectedRecipesCount = createRecipeState.userInfo[expectedAuthorName].recipesCount;
    const expectedSporksCount = createRecipeState.userInfo[expectedAuthorName].sporksCount;
    const expectedFollowersCount = createRecipeState.userInfo[expectedAuthorName].followersCount;
    const expectedFavoritesCount = createRecipeState.userInfo[expectedAuthorName].favoritesCount;

    expect(recipesCount).toEqual(expectedRecipesCount.toString());
    expect(sporksCount).toEqual(expectedSporksCount.toString());
    expect(followersCount).toEqual(expectedFollowersCount.toString());
    expect(favoritesCount).toEqual(expectedFavoritesCount.toString());
  });

});
