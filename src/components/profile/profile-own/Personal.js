import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import Imgur from './imgur-profile.js'

class Personal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imageUrl: ''
    }
  }

  componentDidMount() {
    var feedback = (res) => {
      if (res.success === true) {
        this.setState({ imageUrl: res.data.link, imageError: false });
      }
    };
    new Imgur({
        clientid: '2f82e4d530661d9',
        callback: feedback
    });
  }

  handleFormSubmit(formProps) {
    formProps.preventDefault()
    console.log(this.state.imageUrl)
    this.props.postProfile({
      image:this.state.imageUrl,
      username: this.props.username
    })
  }

  render(){
    return <div>
      <form onSubmit={this.handleFormSubmit.bind(this)}>
        <div className="col-md pull-left">
          <div className="dropzone-profile" id="drop"></div>
        </div>
        <button action="submit" className="btn btn-primary form-control" >Submit</button> 
      </form>
    </div>
  }
}

function mapStateToProps(state) {
  return { 
    username: state.auth.username
  };
}

export default connect(mapStateToProps, actions)(Personal);