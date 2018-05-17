import React, { Component } from 'react';
import Nav from './Nav';

class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tag: ''
    };

    this.handleTagChange = this.handleTagChange.bind(this);
  }

  handleTagChange(event) {
    // updating [tags] in state to send with upload request
    this.setState({ tag: event.target.value });
    console.log('tag: ', this.state.tag);
  };

  uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      { //cloud_name: 'flycrow',
        upload_preset: 'ubx3ytwg',
<<<<<<< HEAD
<<<<<<< HEAD
        tags: this.state.tag,
        sources: ['local', 'url']
=======
=======
>>>>>>> parent of 031d5bf... Playlist working
        tags: ['fcm'],
        sources: ['local', 'url', 'google_photos', 'facebook', 'image_search']
>>>>>>> parent of 031d5bf... Playlist working
      },
      function(error, result) {
          console.log("This is the result of the last upload", result);
      });
  };

  render() {

    return (
      <div>
        <Nav />
        <h3 className="text-center">Upload your content</h3>
        <hr/>

        <div className="col-sm-12">
          <div className="jumbotron text-center">
<<<<<<< HEAD
<<<<<<< HEAD
            <input placeholder="Content Tag" onChange={this.handleTagChange} />
            <button onClick={this.uploadWidget} className="btn btn-lg btn-info">Upload Content</button>
=======
            <button onClick={this.uploadWidget} className="btn btn-lg btn-info">Upload Video</button>
>>>>>>> parent of 031d5bf... Playlist working
=======
            <button onClick={this.uploadWidget} className="btn btn-lg btn-info">Upload Video</button>
>>>>>>> parent of 031d5bf... Playlist working
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
