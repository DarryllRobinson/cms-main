import React, { Component } from 'react';
import { Link } from 'react-router';
//import { login, logout, isLoggedIn } from '../utils/AuthService';
import { isLoggedIn } from '../utils/AuthService';
import '../App.css';

class Nav extends Component {

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">FCM CMS</Link>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <Link to="/">Content Library</Link>
          </li>
          <li>
            {
             ( isLoggedIn() ) ? <Link to="/upload">Upload Content</Link> :  ''
            }
          </li>
          <li>
            {
             ( isLoggedIn() ) ? <Link to="/screen">Screen Display</Link> :  ''
            }
          </li>
          <li>
            {
             ( isLoggedIn() ) ? <Link to="/scheduler">Scheduler</Link> :  ''
            }
          </li>
          <li>
            {
             ( isLoggedIn() ) ? <a href="https://docs.google.com/spreadsheets/d/1B70FvJwk99np5vxwAQKUF2vTOE391jLLOnrx7dtZhKk/edit?pli=1#gid=0" target="_blank">Boss</a> :  ''
            }
          </li>
        </ul>{/*
        <ul className="nav navbar-nav navbar-right">
          <li>
           {
             (isLoggedIn()) ? ( <button className="btn btn-danger log" onClick={() => logout()}>Log out </button> ) : ( <button className="btn btn-info log" onClick={() => login()}>Log In</button> )


            ( !isLoggedIn() ) ? <Link to="/login">Log In</Link> :  <Link to="/logout">Log Out</Link>
          }
          </li>
        </ul>*/}
      </nav>
    );
  }
}

export default Nav;
