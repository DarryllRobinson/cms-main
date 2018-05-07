import React, { Component } from 'react';
import { Button, Nav, Navbar, NavItem } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Flying Crow Media Content Management System</a>
          </Navbar.Brand>
          <Button
            bsStyle="primary"
            className="btn-margin"
            //onClick={this.goTo.bind(this, 'home')}
          >
            Home
          </Button>
          {
            //!isAuthenticated() && (
            (
                <Button
                  id="qsLoginBtn"
                  bsStyle="primary"
                  className="btn-margin"
                  //onClick={this.login.bind(this)}
                >
                  Log In
                </Button>
              )
          }
          {
            //isAuthenticated() && (
            (
                <Button
                  id="qsLogoutBtn"
                  bsStyle="primary"
                  className="btn-margin"
                  //onClick={this.logout.bind(this)}
                >
                  Log Out
                </Button>
              )
          }
          {
            //isAuthenticated() && (
            (
              <Button
                bsStyle="primary"
                className="btn-margin"
                //onClick={this.goTo.bind(this, 'upload')}
              >
                Upload
              </Button>
            )
          }
        </Navbar.Header>
      </Navbar>
      </div>
    );
  }
}

export default App;
