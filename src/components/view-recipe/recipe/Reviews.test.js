import React from 'react';
import { shallow } from 'enzyme';
import { Reviews } from './Reviews';
import { createRecipeState } from '../../../test/test_state';

describe('Reviews', () => {
  const review = shallow(<Reviews
    username={createRecipeState.auth.username}
    recipe={createRecipeState.recipes.selectedRecipe}
    reviews={createRecipeState.reviews.data}
    handleSubmit={() => null}
  />);
  const reviews = createRecipeState.reviews.data;

  it('renders correct number of stars per review', () => {
    const reviewStars = review.find('.review-star').map((rating, index) => {
      rating.children().map(child => {
        expect(child.type()).toEqual('img');
      });
      expect(rating.children()).toHaveLength(reviews[index].rating);
    });
  });

  it('renders reviews', () => {
    const reviewText = review.find('p').map((singleReview, index) => {
      expect(singleReview.text()).toEqual(reviews[index].review);
    });
  });

  it('shows the author of the review', () => {
    const reviewAuthor = review.find('AuthorTile');
    expect(reviewAuthor).toBeDefined();
  });

});