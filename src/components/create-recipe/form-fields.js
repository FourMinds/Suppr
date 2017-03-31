import React from 'react';

export const imageUrlField = imageUrl => (
  <fieldset className="form-group">
    <label>Image URL:</label>
    <input {...imageUrl.input} className="form-control" />
  </fieldset>
)

export const prepTimeField = prepTime => (
  <fieldset className="form-group">
    <label>Prep Time:</label>
    <input {...prepTime.input} className="form-control" />
  </fieldset>
)

export const cookTimeField = cookTime => (
  <fieldset className="form-group">
    <label>Cook Time:</label>
    <input {...cookTime.input} className="form-control" />
  </fieldset>
)

export const servingsField = servings => (
  <fieldset className="form-group">
    <label># of Servings:</label>
    <input {...servings.input} className="form-control" />
  </fieldset>
)

export const difficultyField = difficulty => (
  <fieldset className="form-group">
    <label>Difficulty:</label>
    <input {...difficulty.input} className="form-control" />
  </fieldset>
)

export const descriptionField = description => (
  <fieldset className="form-group">
    <label>Description:</label>
    <input {...description.input} className="form-control" />
  </fieldset>
)

export const quantityField = quantity => (
  <fieldset className="form-group">
    <label>Quantity:</label>
    <input {...quantity.input} className="form-control" />
  </fieldset>
)

export const itemsField = items => (
  <fieldset className="form-group">
    <label>Item:</label>
    <input {...items.input} className="form-control" />
  </fieldset>
)

export const instructionsField = instructions => (
  <fieldset className="form-group">
    <label>Instructions:</label>
    <textarea {...instructions.input} className="form-control" />
  </fieldset>
)

export const recipeNameField = recipeName => (
  <fieldset className="form-group">
    <label>Recipe Title:</label>
    <input {...recipeName.input} className="form-control" />
  </fieldset>
)