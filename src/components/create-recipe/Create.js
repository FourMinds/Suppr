import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import * as fields from './form-fields';
import Ingredients from './Ingredients';
import RecipeImage from './RecipeImage';
import validate from './validate'
import $ from 'jquery';


import TagsInput from 'react-tagsinput'


const {imageUrlField, recipeNameField, prepTimeField, cookTimeField, servingsField, difficultyField, descriptionField, instructionsField} = fields;

class Create extends Component {
  constructor() {
    super();
    this.state = {
      tags: [],
      tag: ''
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleChange(tags) {
    this.setState({tags})
  }

  handleChangeInput(tag) {
    this.setState({tag})
  }

  // componentDidMount() {
  //   $(document).ready(function() {
  //     $("#preview-image").on("load", function(){
  //       $(this).parent().removeClass('image-preview');
  //       $(this).parent().addClass('image-preview-load');
  //     })
  //     $("#preview-image").on("error", function(){
  //         $(this).attr('src', '');
  //     });
  //     $("#image-input").on("input", function(){
  //       if($(this).val() === '') $('#image-container').addClass('image-preview')
  //     });
  //   });
  // }

  renderAlert() {
    if (this.props.submitFailed) {
      return (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <strong>Error:</strong> You should check in on some of those fields below.
        </div>
      );
    }
  }

  handleFormSubmit(formProps) {
    // this enables validation of tags
    formProps.tags = this.state.tags;

    const { username } = this.props;
    const { recipeName, imageUrl, difficulty, cookTime, prepTime, servings, instructions, description } = formProps;
    const { tags } = this.state;
    const ingredients = Object.keys(formProps).reduce((list, val, i) => {
      let [quantity, items] = [`quantity${i}`, `items${i}`];
      if(formProps[quantity]) list.quantity.push(formProps[quantity]);
      if(formProps[items]) list.items.push(formProps[items]);
      return list
    }, {quantity: [], items: []});
    this.props.postRecipe({
      recipeName, 
      imageUrl, 
      difficulty, 
      cookTime, 
      prepTime, 
      servings, 
      instructions, 
      description, 
      ingredients, 
      username,
      tags
    })
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
      {this.renderAlert()}
      <div className="create-flex-body spaced">
        <div className="create-flex-element-left">
          <Field name="recipeName" component={recipeNameField} />
          <Field name="description" component={descriptionField} />
          Ingredients:
          <Ingredients />
          <Field name="instructions" component={instructionsField} />
          <TagsInput
            value={this.state.tags}
            onChange={this.handleChange.bind(this)}
            inputValue={this.state.tag}
            onChangeInput={this.handleChangeInput.bind(this)}
            tagProps={{className: 'react-tagsinput-tag', classNameRemove: 'react-tagsinput-remove'}}
            />
          {this.state.tags.length < 2
          ? <Field name="tags" component={tags =>
              <fieldset className="form-group">
                {tags.meta.touched && tags.meta.error && <div className="error">{tags.meta.error}</div>}
              </fieldset>
            } />
          : null }
        </div>
        <div className="create-flex-element-right">
          <RecipeImage />
          {/*<Field name="imageUrl" component={imageUrlField} />*/}
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
  initialValues: {difficulty: "Choose..."},
  validate
})(Create));
