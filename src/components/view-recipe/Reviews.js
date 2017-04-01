import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';

const ratingField = rating => (
  <fieldset className="form-group">
    <label className="mr-sm-2">Rating </label><br/>
    <select {...rating.input} className="rounded-0 custom-select mb-2 mr-sm-2 mb-sm-0" id="inlineFormCustomSelect">
      <option selected disabled>Choose...</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  </fieldset>
);

const reviewField = review => (
  <fieldset className="form-group">
    <label>Review</label>
    <textarea {...review.input} className="form-control rounded-0" />
  </fieldset>
);

class Reviews extends Component {
  handleFormSubmit(formProps) {
    const { id } = this.props.recipe ? this.props.recipe : '';
    const { username } = this.props;
    this.props.postReview({...formProps, recipeId: id, username});
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        {this.props.reviews ?
          this.props.reviews.map(review => <p>{review.review}</p>) :
          null}
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Field name="rating" component={ratingField}></Field>
          <Field name="review" component={reviewField}></Field>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    username: state.auth.username,
    recipe: state.recipes.selectedRecipe,
    reviews: state.reviews.data
  }
}

export default connect(mapStatetoProps, actions)(reduxForm({
  form: 'reviews'
})(Reviews))