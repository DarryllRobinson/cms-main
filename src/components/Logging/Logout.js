import React, { Component } from 'react';
import Nav from '../Nav';

class Logout extends Component {

  render() {
    return (
      <div>
        <Nav />
        <h3 className="text-center">Logged out</h3>
      </div>
    );
  }
}

export default Logout;
