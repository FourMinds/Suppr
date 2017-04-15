import React, { Component } from 'react';
import { Field } from 'redux-form';
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
      total: 3
    }
    this.renderForm = this.renderForm.bind(this);
  }

  handleAdd(e) {
    let { total } = this.state;
    total += 1;
    this.setState({ total });
  }
  handleRemove(e) {
    let { total } = this.state;
    total = total > 1 ? total - 1 : total;
    this.setState({ total });
  }

  renderForm() {  
    return Array(this.state.total).fill(1).map((v, i) => {
      let [quantity, items] = [`quantity${i}`, `items${i}`];
      return <Group quantity={quantity} items={items} key={i} index={i}/>
    });

  }
                  
  render() {
    return (
      <div>
        <section>
         {this.renderForm()} 
        </section>
         <div className="ingredient-button-div">
          <a className="btn btn-primary ingredient-button" style={{color: '#fff'}} onClick={this.handleAdd.bind(this)}>
            <span className="fa fa-plus" aria-hidden="true"></span>
          </a>
          <a className="btn btn-primary ingredient-button" style={{color: '#fff'}} onClick={this.handleRemove.bind(this)}>
            <span className="fa fa-minus" onClick={this.handleRemove.bind(this)} aria-hidden="true"></span>
          </a>
        </div>
      </div>
    )
  }
}

export default Ingredients;