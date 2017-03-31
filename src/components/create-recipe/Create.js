import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import * as fields from './form-fields';
import Ingredients from './Ingredients';

const {imageUrlField, recipeNameField, prepTimeField, cookTimeField, servingsField, difficultyField, descriptionField, quantityField, itemsField, instructionsField} = fields

class Create extends Component {
  handleFormSubmit(formProps) {
    console.log(formProps)
  }

  render() {
  
    const { handleSubmit } = this.props;
    return (

      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
      <div className="flex-body">
        <div className="create-flex-element-left">
          <Field name="imageUrl" component={imageUrlField} />
          <Field name="prepTime" component={prepTimeField} />
          <Field name="cookTime" component={cookTimeField} />
          <Field name="servings" component={servingsField} />
          <Field name="difficulty" component={difficultyField} />
        </div>
      <div className="create-flex-element-right">
        <Field name="recipeName" component={recipeNameField} />
        <Field name="description" component={descriptionField} />
        <Ingredients />
        <Field name="instructions" component={instructionsField} />
        <button action="submit" className="btn btn-primary">Submit</button>     
      </div>
      </div>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'create',
})(Create));
