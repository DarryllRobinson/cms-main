import React, { Component } from 'react';
import Nav from './Nav';

class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tag: 'n/a'
    };

    this.handleTagChange = this.handleTagChange.bind(this);
    this.uploadWidget = this.uploadWidget.bind(this);
  }

  handleTagChange(event) {
    console.log('tag before: ', this.state.tag);
    // updating [tags] in state to send with upload request
    this.setState({ tag: event.target.value });
    /*this.setState(state => {
      state.tag = event.target.value;
      return state;
    });*/
    console.log('tag after: ', this.state.tag);
  };

  uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      { cloud_name: 'flycrow',
        upload_preset: 'ubx3ytwg',
        tags: this.state.tag,
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
        <h3 className="text-center">Upload your content</h3>
        <hr/>

        <div className="col-sm-12">
          <div className="jumbotron text-center"><input placeholder="Content Tag" onChange={this.handleTagChange}></input>
            <button onClick={this.uploadWidget} className="btn btn-lg btn-info">Upload Content</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
