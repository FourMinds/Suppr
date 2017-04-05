import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import * as fields from './form-fields';
import Ingredients from './Ingredients';
import $ from 'jquery';

const {imageUrlField, recipeNameField, prepTimeField, cookTimeField, servingsField, difficultyField, descriptionField, quantityField, itemsField, instructionsField} = fields

class Create extends Component {
  componentDidMount() {
    $(document).ready(function() {
      $("#preview-image").on("load", function(){
        $(this).parent().removeClass('image-preview');
        $(this).parent().addClass('image-preview-load');
      })
      $("#preview-image").on("error", function(){
          $(this).attr('src', '');         
      });
      $("#image-input").on("input", function(){
        $(this).val() === '' ? $('#image-container').addClass('image-preview'): null         
      });
    });
  }
  handleFormSubmit(formProps) {
    const { username } = this.props
    const { recipeName, imageUrl, difficulty, cookTime, prepTime, servings, instructions, description } = formProps
    const ingredients = Object.keys(formProps).reduce((list, val, i) => {
      let [quantity, items] = [`quantity${i}`, `items${i}`]
      formProps[quantity] ? list.quantity.push(formProps[quantity]) : null;
      formProps[items] ? list.items.push(formProps[items]) : null;
      return list
    }, {quantity: [], items: []})
    this.props.postRecipe({
      recipeName, imageUrl, difficulty, cookTime, prepTime, servings, instructions, description, ingredients, username
    })
  }

  render() {
  
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
      <div className="flex-body spaced">
        <div className="create-flex-element-left">
          <Field name="recipeName" component={recipeNameField} />
          <Field name="description" component={descriptionField} />
          Ingredients:
          <Ingredients />
          <Field name="instructions" component={instructionsField} />              
        </div>
        <div className="create-flex-element-right">
          <Field name="imageUrl" component={imageUrlField} />
          <div className="inner-flex-body">
          <div className="inner-flex-element">
          <Field name="prepTime" component={prepTimeField} />
          </div>
          <div className="inner-flex-element">
          <Field name="cookTime" component={cookTimeField} />
          </div>
          </div>
          <Field name="servings" component={servingsField} />
          <Field name="difficulty" component={difficultyField} />
        </div>
        <button action="submit" className="btn btn-primary form-control submit-button" >Submit</button> 
      </div>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return { username: state.auth.username };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'create',
})(Create));
