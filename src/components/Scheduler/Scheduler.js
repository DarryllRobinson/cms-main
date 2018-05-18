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
      startDate: moment(),
      endDate: moment()
    };

    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
  }

  handleStartChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleEndChange(date) {
    this.setState({
      endDate: date
    });
  }

  render() {

    return (
      <div>
        <Nav />
        <h3 className="text-center">Scheduler</h3>
        <hr/>

        <Upload />

        Start Date
        <DatePicker
          dateFormat="YYYY/MM/DD"
          selected={this.state.startDate}
          onChange={this.handleStartChange}
        />

        End Date
        <DatePicker
          dateFormat="YYYY/MM/DD"
          selected={this.state.endDate}
          onChange={this.handleEndChange}
        />

      </div>
    );
  }
}

export default Scheduler;
