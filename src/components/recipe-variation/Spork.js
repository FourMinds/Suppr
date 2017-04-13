import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import * as fields from './form-fields';
import Ingredients from './Ingredients';
import validate from './validate'
import $ from 'jquery';
import Imgur from '../../imgur.js'

import TagsInput from 'react-tagsinput'

const {imageUrlField, recipeNameField, prepTimeField, cookTimeField, servingsField, difficultyField, descriptionField, instructionsField} = fields;

class Create extends Component {
  constructor() {
    super();
    this.state = {
      tags: [],
      tag: '',
      imageUrl: '',
      imageError: false
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.reUploadImage = this.reUploadImage.bind(this);
  }

  handleChange(tags) {
    this.setState({tags})
  }

  handleChangeInput(tag) {
    this.setState({tag})
  }

  componentDidMount() {
    this.setState({ 
      tags: this.props.initialValues.tags,
      imageUrl:  this.props.initialValues.imageUrl
    })
    var feedback = (res) => {
      if (res.success === true) {
        $('#image-container').show()
        $('#image-container').addClass('image-preview-load')
        $('#preview-image').attr('src', res.data.link)
        $('#preview-image').show()
        $('.col-md').hide()
        $('#re-upload-button').removeClass('re-upload')
        this.setState({ imageUrl: res.data.link, imageError: false })
      }
    };
    new Imgur({
        clientid: '2f82e4d530661d9',
        callback: feedback
    });
  }

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

  trySubmit() {
    if (!this.state.imageUrl) {
      this.setState({ imageError: true })
    }
  }

  reUploadImage() {
    $('.col-md').show();
    $('#image-container').hide();
    $('#re-upload-button').addClass('re-upload');
    $('#preview-image').attr('src', '');
    this.setState({ imageUrl: '' });
  }

  handleFormSubmit(formProps) {
    // this enables validation of tags
    formProps.tags = this.state.tags;

    const { username } = this.props;
    const { id } = this.props.initialValues;
    const { recipeName, difficulty, cookTime, prepTime, servings, instructions, description } = formProps;
    const { tags, imageUrl } = this.state;
    const ingredients = Object.keys(formProps).reduce((list, val, i) => {
      let [quantity, items] = [`quantity${i}`, `items${i}`];
      if (formProps[quantity]) list.quantity.push(formProps[quantity]);
      if (formProps[items]) list.items.push(formProps[items]);
      return list
    }, {quantity: [], items: []});
    this.props.postRecipe({
      parentId: id,
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
    }, true)
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
      {this.renderAlert()}
      <div className="flex-body spaced">
        <div className="create-flex-element-left">
          <Field name="recipeName" component={recipeNameField} />
          <Field name="description" component={descriptionField} />
          Ingredients:
          <Ingredients ingredients={this.props.initialValues.ingredients}/>
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
          <fieldset className="form-group">
             <div className="col-md" style={{display: 'none'}}>
                  <div className="dropzone" id="drop"></div>

              </div>
              <div id="image-container" className="image-preview-load">
                <img alt="" id="preview-image" src={this.props.initialValues.imageUrl} />
              </div>
              <div className="flex-body"><a onClick={this.reUploadImage} 
                id="re-upload-button" 
                className="btn btn-primary text-center" 
                style={{color: 'white', margin:'auto'}}>
                Remove image
              </a>
              </div>
              {this.state.imageError && <div className="error">Please upload an image</div>}
            </fieldset>
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
        
        <button action="submit" className="btn btn-primary form-control submit-button" onClick={this.trySubmit.bind(this)}>Submit</button> 
      </div>
      </form>
    )
  }
}



function mapStateToProps(state) {
  const { ingredients:{quantity, items} } = state.recipes.pushVariation
  const quantityValues = quantity.reduce((obj, val, i) => {
    const key = `quantity${i}`
    obj[key] = val
    return obj
  }, {})
  const itemsValues = items.reduce((obj, val, i) => {
    const key = `items${i}`
    obj[key] = val
    return obj
  }, {})
  return { username: state.auth.username, initialValues: {...state.recipes.pushVariation, ...quantityValues, ...itemsValues} };
}

// const {id, description, difficulty, id, imageUrl, ingredients, instructions, prepTime, cookTime, servings, tags} = this.props.data

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'create',
  validate
})(Create));
