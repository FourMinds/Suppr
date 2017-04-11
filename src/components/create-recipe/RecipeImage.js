import React, { Component } from 'react';
import { Field } from 'redux-form';
import Dropzone from 'react-dropzone';

class RecipeImage extends Component {
  render() {
    let { onDrop, imageFile } = this.props;

    return (
      <div>
      <label>Image:</label>
      <Dropzone className={imageFile ? "image-preview-load" : "image-preview"} onDrop={onDrop}>
        {imageFile
          ? <img id="preview-image" src={imageFile[0].preview} alt="preview"/>
          : null}
      </Dropzone>
      </div>
    )
  }
}

export default RecipeImage;