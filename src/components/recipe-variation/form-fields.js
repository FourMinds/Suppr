import React from 'react';

export const imageUrlField = imageUrl => (
  <fieldset className="form-group">
    <div  id="image-container"><img alt="" id="preview-image" src={imageUrl.input.value} /></div>
    <label>Image URL</label>
    <input {...imageUrl.input} className="form-control rounded-0" id="image-input"/>
    {imageUrl.meta.touched && imageUrl.meta.error && <div className="error">{imageUrl.meta.error}</div>}
  </fieldset>
)

export const prepTimeField = prepTime => (
  <fieldset className="form-group">
    <label>Prep Time (min)</label>
    <input {...prepTime.input} className="form-control rounded-0" />
    {prepTime.meta.touched && prepTime.meta.error && <div className="error">{prepTime.meta.error}</div>}
  </fieldset>
)

export const cookTimeField = cookTime => (
  <fieldset className="form-group">
    <label>Cook Time (min)</label>
    <input {...cookTime.input} className="form-control rounded-0" />
    {cookTime.meta.touched && cookTime.meta.error && <div className="error">{cookTime.meta.error}</div>}
  </fieldset>
)

export const servingsField = servings => (
  <fieldset className="form-group">
    <label># of Servings</label>
    <input {...servings.input} className="form-control rounded-0" />
    {servings.meta.touched && servings.meta.error && <div className="error">{servings.meta.error}</div>}
  </fieldset>
)

export const difficultyField = difficulty => (
  <fieldset className="form-group">
    <label className="mr-sm-2">Difficulty </label><br/>
  <select {...difficulty.input} className="rounded-0 custom-select mb-2 mr-sm-2 mb-sm-0 stretch" id="inlineFormCustomSelect">
    <option disabled>Choose...</option>
    <option value="Easy">Easy</option>
    <option value="Medium">Medium</option>
    <option value="Hard">Hard</option>
  </select>
  {difficulty.meta.touched && difficulty.meta.error && <div className="error">{difficulty.meta.error}</div>}
  </fieldset>
)

export const descriptionField = description => (
  <fieldset className="form-group">
    <label>Description</label>
    <textarea {...description.input} className="form-control rounded-0" />
    {description.meta.touched && description.meta.error && <div className="error">{description.meta.error}</div>}
  </fieldset>
)

export const quantityField = quantity => (
  <fieldset className="form-group">
    <input {...quantity.input} className="form-control rounded-0" />
    {quantity.meta.touched && quantity.meta.error && <div className="error">{quantity.meta.error}</div>}
  </fieldset>
)

export const itemsField = items => (
  <fieldset className="form-group">
    <input {...items.input} className="form-control rounded-0" />
    {items.meta.touched && items.meta.error && <div className="error">{items.meta.error}</div>}
  </fieldset>
)

export const instructionsField = instructions => (
  <fieldset className="form-group">
    <label>Instructions</label>
    <textarea {...instructions.input} className="form-control rounded-0" placeholder="Write each step on a new line" style={{height: "8em"}}/>
    {instructions.meta.touched && instructions.meta.error && <div className="error">{instructions.meta.error}</div>}
  </fieldset>
)

export const recipeNameField = recipeName => (
  <fieldset className="form-group">
    <label>Recipe Title</label>
    <input {...recipeName.input} className="form-control rounded-0" />
    {recipeName.meta.touched && recipeName.meta.error && <div className="error">{recipeName.meta.error}</div>}
  </fieldset>
)