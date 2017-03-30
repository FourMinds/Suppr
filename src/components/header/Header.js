import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router';

class Header extends Component {
  renderLinks() {
    if (!this.props.authenticated) {
      return [
        <li className="nav-item" key={1}>
              <Link className="nav-link" to="/auth/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/auth/signup">Sign Up</Link>
        </li>
      ]
    } else {
      return [
        <li className="nav-item" key={1}>
              <Link className="nav-link" to="/auth/signout">Sign Out</Link>
        </li>
      ]
    }
  }
  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <a className="navbar-brand" href="#">Suppr</a>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/home">Home <span className="sr-only">(current)</span></Link>
          </li>
          {this.renderLinks()}
        </ul>
        <form className="form-inline mt-2 mt-md-0">
          <input className="form-control mr-sm-2" placeholder="Search" type="text" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
    )
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);