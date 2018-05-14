import React, { Component } from "react";

class Input extends Component {
	render() {
		return (
			<div className="Input">
				<input
					id={this.props.id}
					autoComplete="true"
					required
					type={this.props.type}
					placeholder={this.props.placeholder}
				/>
				<label htmlFor={this.props.id}></label>
			</div>
		);
	}
};

export default Input;
