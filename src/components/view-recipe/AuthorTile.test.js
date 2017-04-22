import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import AuthorTile from './AuthorTile';
import { createRecipeStore } from '../../test/test_state';

describe('Author Tile', () => {
  const authorTile = mount(<Provider store={createRecipeStore}><AuthorTile username="Bluzkry"/></Provider>);

  it('renders the author name', () => {
    const authorName = authorTile.find('.author-name').text();
    expect(authorName).toEqual('Bluzkry');
  });

  it('renders the author statistics', () => {
    const recipesCount = authorTile.find('[title="recipes"]').parent().last().text();
    const sporksCount = authorTile.find('[title="sporks"]').parent().last().text();
    const followersCount = authorTile.find('[title="followers"]').parent().last().text();
    const favoritesCount = authorTile.find('[title="likes"]').parent().last().text();

    expect(recipesCount).toEqual('2');
    expect(sporksCount).toEqual('2');
    expect(followersCount).toEqual('3');
    expect(favoritesCount).toEqual('6');
  });

});
