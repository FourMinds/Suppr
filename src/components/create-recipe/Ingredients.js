import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import {quantityField, itemsField} from './form-fields'

const Group = (props) => {
  return (
    <div className="inner-flex-body">
      <div className="inner-flex-element">
        <Field name={props.quantity} component={quantityField}/>
      </div>
      <div className="inner-flex-element">
        <Field name={props.items} component={itemsField} />
      </div>
    </div>
  )
}

class Ingredients extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 0
    }
    this.renderForm = this.renderForm.bind(this)
  }

  handleClick() {
    console.log(this.state.total)
    let { total } = this.state
    total += 1
    this.setState({ total })
  }

  renderForm() {  
    return Array(this.state.total).fill(1).map((v, i) => {
      let [quantity, items] = [`quantity${i}`, `items${i}`];
      return <Group quantity={quantity} items={items} key={i}/>
    })

  }
  render() {
    return (
      <div>
       {this.renderForm()} 
      <a className="btn btn-primary" onClick={this.handleClick.bind(this)}>+ Add Ingredient</a>
      </div>
    )
  }
}

export default Ingredients;