import React, { Component } from 'react';
import Nav from '../Nav';
import Upload from '../Upload';
import {Industry} from './Industry';
import { Category } from './Category';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import './react-datepicker.css';

class Scheduler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auto: false,
      name: '',
      startDate: moment(),
      endDate: moment(),
      industry: '',
      category: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.uploadWidget = this.uploadWidget.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
    console.log('logging: ',
    [
      this.state.auto.toString(),
      this.state.name.toString(),
      this.state.startDate.format(),
      this.state.endDate.format(),
      this.state.industry.toString(),
      this.state.category.toString(),
      'TBM'
    ]);
  }

  handleDateChange(date) {
    this.setState({ startDate: date })
  }

  prepareTags() {

  }

  uploadWidget = () => {
    let myTags = [
      /*this.state.auto.toString(),
      this.state.name.toString(),
      this.state.startDate.format(),
      this.state.endDate.format(),
      this.state.industry.toString(),
      this.state.category.toString(),*/
      'TBM'
    ];

    window.cloudinary.openUploadWidget( {
      cloud_name: 'flycrow',
      upload_preset: 'ubx3ytwg',
      tags: myTags,
      sources: ['local', 'url']
    },
      function(error, result) {
          console.log("This is the result of the last upload", result);
      });
  }

  render() {

    return (
      <div>
        <Nav />
        <h3 className="text-center">Scheduler</h3>
        <hr/>
        <form onChange={this.handleChange}>
          <h3>Campaign Details</h3>

          <p>
          <input type="text" name="name" placeholder="Campaign Name" />
          Auto Schedule <input type="checkbox" name="auto" />
          <Industry
            name="industry"
            value={this.state.industry}
            onChange={this.handleChange} />
          <Category
              name="category"
              value={this.state.category}
              onChange={this.handleChange} />
          </p>

          Start Date and Time
          <DatePicker
            dateFormat="YYYY/MM/DD HH:mm"
            name="startDate"
            todayButton={"Today"}
            selected={this.state.startDate}
            onChange={this.handleDateChange}
            showTimeSelect
            timeCaption="Time"
            timeFormat="HH:mm"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            showWeekNumbers
             />

          End Date and Time
          <DatePicker
            dateFormat="YYYY/MM/DD HH:mm"
            name="endDate"
            todayButton={"Today"}
            selected={this.state.endDate}
            onChange={this.handleDateChange}
            showTimeSelect
            timeCaption="Time"
            timeFormat="HH:mm"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            showWeekNumbers
             />

             <div className="jumbotron text-center">{/*<input placeholder="Content Tag" onChange={this.handleTagChange}></input>*/}
               <button onClick={this.uploadWidget} className="btn btn-lg btn-info">Upload Content</button>
             </div>
        </form>

      </div>
    );
  }
}

export default Scheduler;
