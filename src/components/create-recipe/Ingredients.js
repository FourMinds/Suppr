import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import {quantityField, itemsField} from './form-fields'

const Group = (props) => {
  return (
    <div className="inner-flex-body">
      <div className="inner-flex-element">
      <label className={props.index===0?"":"hide-label"}>Quantity</label>
        <Field name={props.quantity} component={quantityField}/>
      </div>
      <div className="inner-flex-element">
        <label className={props.index===0?"":"hide-label"}>Item</label>
        <Field name={props.items} component={itemsField} />
      </div>
    </div>
  )
}

class Ingredients extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 1
    }
    this.renderForm = this.renderForm.bind(this)
  }

  handleClick() {
    let { total } = this.state
    total += 1
    this.setState({ total })
  }

  renderForm() {  
    return Array(this.state.total).fill(1).map((v, i) => {
      let [quantity, items] = [`quantity${i}`, `items${i}`];
      return <Group quantity={quantity} items={items} key={i} index={i}/>
    })

  }
  render() {
    return (
      <div>
      <section>
       {this.renderForm()} 
       </section>
       <div style={{display: 'flex', justifyContent: "flex-end"}}>
      <a className="btn btn-primary" style={{color: '#fff'}} onClick={this.handleClick.bind(this)}>+ Add New Ingredient</a>
      </div>
      </div>
    )
  }
}

export default Ingredients;