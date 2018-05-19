import React, { Component } from 'react';
import Nav from '../Nav';
import Upload from '../Upload';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

class Scheduler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auto: false,
      name: '',
      startDate: moment(),
      endDate: moment()
    };

    this.setField = this.setField.bind(this);
  }

  setField (e) {
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({[e.target.name]: e.target.value})
  }

  render() {

    return (
      <div>
        <Nav />
        <h3 className="text-center">Scheduler</h3>
        <hr/>

        <Upload />
        <form onChange={this.setField}>
          <h3>Content Details</h3>
          <p>
          <input type="text" name="name" placeholder="Content Name" />
          Auto Schedule <input type="checkbox" name="auto" />
          </p>
          Start Date
          <DatePicker
            dateFormat="YYYY/MM/DD"
            name="startDate"
            selected={this.state.startDate}
            onChange={this.setField}
          />

          End Date
          <DatePicker
            dateFormat="YYYY/MM/DD"
            selected={this.state.endDate}
            onChange={this.setField}
          />
        </form>

      </div>
    );
  }
}

export default Scheduler;
