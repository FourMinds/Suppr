import React from 'react';

export const imageUrlField = imageUrl => (
  <fieldset className="form-group">
    <div className="image-preview" id="image-container"><img alt="" id="preview-image" src={imageUrl.input.value} /></div>
    <label>Image URL</label>
    <input {...imageUrl.input} className="form-control rounded-0" id="image-input"/>
  </fieldset>
)

export const prepTimeField = prepTime => (
  <fieldset className="form-group">
    <label>Prep Time</label>
    <input {...prepTime.input} className="form-control rounded-0" />
  </fieldset>
)

export const cookTimeField = cookTime => (
  <fieldset className="form-group">
    <label>Cook Time</label>
    <input {...cookTime.input} className="form-control rounded-0" />
  </fieldset>
)

export const servingsField = servings => (
  <fieldset className="form-group">
    <label># of Servings</label>
    <input {...servings.input} className="form-control rounded-0" />
  </fieldset>
)

export const difficultyField = difficulty => (
  <fieldset className="form-group">
    <label className="mr-sm-2">Difficulty </label><br/>
  <select {...difficulty.input} className="rounded-0 custom-select mb-2 mr-sm-2 mb-sm-0" id="inlineFormCustomSelect">
    <option selected disabled>Choose...</option>
    <option value="Easy">Easy</option>
    <option value="Medium">Medium</option>
    <option value="Hard">Hard</option>
  </select>
  </fieldset>
)

export const descriptionField = description => (
  <fieldset className="form-group">
    <label>Description</label>
    <textarea {...description.input} className="form-control rounded-0" />
  </fieldset>
)

export const quantityField = quantity => (
  <fieldset className="form-group">
    <input {...quantity.input} className="form-control rounded-0" />
  </fieldset>
)

export const itemsField = items => (
  <fieldset className="form-group">
    <input {...items.input} className="form-control rounded-0" />
  </fieldset>
)

export const instructionsField = instructions => (
  <fieldset className="form-group">
    <label>Instructions</label>
    <textarea {...instructions.input} className="form-control rounded-0" />
  </fieldset>
)

export const recipeNameField = recipeName => (
  <fieldset className="form-group">
    <label>Recipe Title</label>
    <input {...recipeName.input} className="form-control rounded-0" />
  </fieldset>
)