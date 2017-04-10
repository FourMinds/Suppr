import React, { Component } from 'react';
import { Field } from 'redux-form';
import $ from 'jquery';

class RecipeImage extends Component {
  constructor(props) {
    super(props);

    this.previewFile = this.previewFile.bind(this);
  }

  componentDidMount() {
    $(document).ready(function() {
      $("#preview-image").on("load", function(){
        $(this).parent().removeClass('image-preview');
        $(this).parent().addClass('image-preview-load');
      })
      $("#preview-image").on("error", function(){
        $(this).attr('src', '');
      });
      $("#image-input").on("load", function(){
        $(this).val() === '' ? $('#image-container').addClass('image-preview'): null
      });
    });
  }

  previewFile() {
    let preview = document.querySelector('#preview-image');
    let file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener('load', _ => {
      preview.src = reader.result;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  render() {
    const imageUrlField = imageUrl => (
      <fieldset className="form-group">
        <div className="image-preview" id="image-container"><img alt="" id="preview-image" src={imageUrl.input.value} /></div>
        <label>Image URL: &nbsp;</label>

        <input type="file" id="image-input" onChange={this.previewFile} />

        {imageUrl.meta.touched && imageUrl.meta.error && <div className="error">{imageUrl.meta.error}</div>}
      </fieldset>
    );

    return (
      <Field name="imageUrl" component={imageUrlField} />
    )
  }
}

export default RecipeImage;