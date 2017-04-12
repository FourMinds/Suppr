import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';

const queryField = query => (
  <input {...query.input} className="form-control mr-sm-2" placeholder="Search" type="text" style={{width: '600px'}}/>

)

class SearchBar extends Component {
  handleFormSubmit({query}) {
    this.props.triggerSearch(query)
  }
  
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
      <form className="form-inline mt-2 mt-md-0" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>>
        <Field name="query" component={queryField}></Field>
        <button className="btn btn-outline-success my-2 my-sm-0" action="submit">Search</button>
      </form>

    )
  }
}

export default connect(null, actions)(reduxForm({
  form: 'search',
})(SearchBar))