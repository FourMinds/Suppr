import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        Starter
        {this.props.children}
      </div>
    );
  }
}

export default App;
