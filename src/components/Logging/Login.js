import React, { Component } from "react";
import Modal from './Modal';
import { setIdToken, setAccessToken } from '../../utils/AuthService';
//import { setIdToken, setAccessToken } from 'utils/AuthService';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import "./Login.css";

class Login extends Component {

  state = {
    mounted: false
  };

  getInitialState() {
    return { mounted: false };
  };

  componentDidMount() {
    this.setState( { mounted: true });
  };

	handleSubmit(e) {
		this.setState({ mounted: false });
		e.preventDefault();
    setAccessToken();
    setIdToken();
    window.location.href = "/";
	};

	render() {
		var child;

		if(this.state.mounted) {
			child = (<Modal onSubmit={this.handleSubmit.bind(this)} />);
		}

    return (

      <div className="App">
          <ReactCSSTransitionGroup
  					transitionName="example"
  					transitionEnterTimeout={500}
  					transitionLeaveTimeout={300}>
						{child}
				  </ReactCSSTransitionGroup>
			</div>
    );
  }
}

export default Login;
