import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import * as fields from './form-fields';
import Ingredients from './Ingredients';
import validate from './validate'
import $ from 'jquery';


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
    this.reUploadImage = this.reUploadImage.bind(this)
  }

  handleChange(tags) {
    this.setState({tags})
  }

  handleChangeInput(tag) {
    this.setState({tag})
  }

  componentDidMount() {
    var feedback = (res) => {
      if (res.success === true) {
        $('#image-container').show()
        $('#image-container').addClass('image-preview-load')
        $('#preview-image').attr('src', res.data.link)
        $('#preview-image').show()
        $('.col-md').hide()
        $('#re-upload-button').removeClass('re-upload')
        this.setState({ imageUrl: res.data.link })
      }
    };
    new window.Imgur({
        clientid: '2f82e4d530661d9',
        callback: feedback
    });

    $(document).ready(function() {
      $("#preview-image").on("load", function(){
        $(this).parent().removeClass('image-preview');
        $(this).parent().addClass('image-preview-load');
      })
      $("#preview-image").on("error", function(){
          $(this).attr('src', '');         
      });
      $("#image-input").on("input", function(){
        if($(this).val() === '') $('#image-container').addClass('image-preview')       
      });
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

  reUploadImage() {
    $('.col-md').show()
    $('#image-container').hide()
    $('#re-upload-button').addClass('re-upload')
    $('#preview-image').attr('src', '')
  }

  handleFormSubmit(formProps) {
    // this enables validation of tags
    formProps.tags = this.state.tags;
    const { username } = this.props;
    const { recipeName, difficulty, cookTime, prepTime, servings, instructions, description } = formProps;
    const { tags, imageUrl } = this.state;
    if (!imageUrl) this.setState({imageError:true})
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
          <fieldset className="form-group">
             <div className="col-md">
                  <div className="dropzone" id="drop"></div>

              </div>
              <div id="image-container">
                <img alt="" id="preview-image" src="" style={{display: 'none'}}/>
              </div>
              <div className="flex-body"><a onClick={this.reUploadImage} id="re-upload-button" className="btn re-upload btn-primary text-center" style={{color: 'white', margin:'auto'}}>Upload a different image</a></div>
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
