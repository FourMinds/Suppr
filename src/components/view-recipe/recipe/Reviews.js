import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { reduxForm, Field } from 'redux-form';
import $ from 'jquery';
import AuthorTile from '../AuthorTile';

const ratingField = rating => (
  <fieldset className="form-group">
    <label className="mr-sm-2">Rating </label><br/>
    {/*parent method validateRating is called onChange; additionally, rating.input.onChange(event) is called to keep Redux form functionality*/}
    <select
      {...rating.input}
      className="rounded-0 custom-select mb-2 mr-sm-2 mb-sm-0"
      id="inlineFormCustomSelect"
      onChange={event => {
        rating.validateRating(event);
        rating.input.onChange(event);
      }}>
      <option disabled value="Choose...">Choose...</option>
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
    <textarea
      {...review.input}
      className="form-control rounded-0"
      style={{height: "8em"}} />
  </fieldset>
);

class Reviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disableRating: true
    };

    this.disableSubmit = this.disableSubmit.bind(this);
    this.validateRating = this.validateRating.bind(this);
  }

  disableSubmit() {
    return this.state.disableRating
  }

  handleFormSubmit(formProps) {
    const { id } = this.props.recipe ? this.props.recipe : '';
    const { username } = this.props;
    this.props.postReview({...formProps, recipeId: id, username});
    $("#reviewModal .closer").click()
  }

  // rating enabled if form value isn't Choose
  validateRating(event) {
    if (event.target.value !== "Choose...") {
      this.setState({
        disableRating: false
      });
    }
  }
  
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    let reviews = this.props.reviews
      ? this.props.reviews.map(review => {
        return (
          <div className="list-group list-group flush review" key={review.id}>
            <div className="list-group-item review-author">
              <AuthorTile username={review.username}/>
              <div className="review-star">
              {new Array(review.rating).fill('').map((current, index) => <img className="star" alt="star" src="/assets/star.png" key={index} ></img>)}
              </div>
            </div>
            <p className="list-group-item">{review.review}</p>
          </div>
        )
      })
      : null;
    // when pristine, button is disabled
    // user can only press submit button when a rating is chosen
    // this happens through validateRating, which changes the disableRating state; then whether or not the button is disabled depends on disableSubmit
    console.log(this.props.reviews)
    return (
      <div className="card-block">
      <div className="review-title">
        <h6>Reviews</h6>
      </div>
      <hr/>
        {reviews.length?reviews:<h5>No reviews yet...</h5>}

        <div className="modal fade" id="reviewModal" tabIndex="-1" role="dialog" aria-labelledby="reviewModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="reviewModalLabel">Write a review</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form
                  className="card-block"
                  onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <div className="modal-body">
                
                  <Field name="rating" component={ratingField} validateRating={this.validateRating}></Field>
                  <Field name="review" component={reviewField}></Field>

               
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary closer" data-dismiss="modal">Close</button>
                <button className="btn btn-primary" disabled={pristine || this.disableSubmit() || submitting}>Submit</button>
              </div>
               </form>
            </div>
          </div>
        </div>

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

// without initial values set to 'Choose...', the initial value of the rating is set to '1'
export default connect(mapStatetoProps, actions)(reduxForm({
  form: 'reviews',
  initialValues: {rating: 'Choose...',}
})(Reviews))
