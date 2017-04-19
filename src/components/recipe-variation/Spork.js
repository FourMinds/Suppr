import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field, FieldArray } from 'redux-form';
import * as actions from '../../actions';
import * as fields from './form-fields';
import validate from './validate'
import $ from 'jquery';
import Imgur from '../../imgur.js'

import TagsInput from 'react-tagsinput'

const {
  recipeNameField,
  prepTimeField, 
  cookTimeField, 
  servingsField, 
  difficultyField, 
  descriptionField, 
  instructionsField,
  quantityField,
  itemsField
} = fields;

const Ingredients = ({ fields, meta: {error} }) => (
  console.log(error),
  <div>
    {fields.map((member, index) =>
      <div className="inner-flex-body" key={index}>
        <button
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}
          className={`btn btn-primary ${index===0?"delete-button-first":"delete-button"}`}
          style={{height: '40px'}}>
            <i className="fa fa-trash-o" aria-hidden="true"></i>
        </button>
        <div className="inner-flex-element">
          <label className={index===0?"":"hide-label"}>Quantity</label>
          <Field
            name={`${member}.quantity`}
            type="text"
            component={quantityField}
            label="Quantity"/>
        </div>
          <div className="inner-flex-element">
          <label className={index===0?"":"hide-label"}>Item</label>
          <Field
            name={`${member}.item`}
            type="text"
            component={itemsField}
            label="Item"/>
          </div>
        {error && <div className="error">{error}</div>}
        </div>
    )}
    <div className="ingredient-button-div">
      <a className="btn btn-primary ingredient-button" onClick={() => fields.push({})} style={{color: '#fff'}}>
        <i className="fa fa-plus" aria-hidden="true"/>
      </a>
    </div>
  </div>
)

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
    });
    let feedback = (res) => {
      if (res.success === true) {
        $('#image-container').show();
        $('#image-container').addClass('image-preview-load');
        $('#preview-image').attr('src', res.data.link);
        $('#preview-image').show();
        $('.col-md').hide();
        $('#re-upload-button').removeClass('re-upload');
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
    const { recipeName, difficulty, cookTime, prepTime, servings, instructions, ingredients, description } = formProps;
    const { tags, imageUrl } = this.state;
    if (!imageUrl) return this.setState({ imageError:true });
    let ingredientsObject = ingredients.reduce((list, val) => {
      list.quantity.push(val.quantity)
      list.items.push(val.item)
      return list
    }, {quantity: [], items: []})
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
      ingredients: ingredientsObject, 
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
          <FieldArray name="ingredients" component={Ingredients}/>
          <Field name="instructions" component={instructionsField} />
          <TagsInput
            value={this.state.tags}
            onChange={this.handleChange.bind(this)}
            inputValue={this.state.tag}
            onChangeInput={this.handleChangeInput.bind(this)}
            inputProps={{
              className: 'react-tagsinput-input create-input',
              placeholder: 'Press return to add a tag'
            }}
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
  const { ingredients:{quantity, items} } = state.recipes.pushVariation;
  const ingredients = quantity.reduce((list, item, i) => {
    list.push({quantity: item, item: items[i]})
    return list
  }, [])
  return { username: state.auth.username, initialValues: {...state.recipes.pushVariation, ingredients } };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'create',
  validate
})(Create));
