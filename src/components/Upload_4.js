import React, { Component } from 'react';
import axios from 'axios';

class Upload extends Component {

  state = {
    selectedFile: null,
    fileToGet: null
  }

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  contentSelectedHandler = event => {
    this.setState({
      fileToGet: event.target.value
    })
  }

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('content', this.state.selectedFile, this.state.selectedFile.name);
    console.log('this.state.selectedFile.name: ', this.state.selectedFile.name);
    console.log('this.state.selectedFile: ', this.state.selectedFile);

    fetch('http://localhost:8080/api/contents/upload', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: fd
    })
  }

  getFile = () => {
    fetch(`http://localhost:8080/api/contents/${this.state.fileToGet}`, {
      method: 'GET'
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {

    return (
      <div>
        <div className="Upload">
          <input
          style={{display: 'none'}}
          type="file"
          onChange={this.fileSelectedHandler}
          ref={fileInput => this.fileInput = fileInput}/>
          <button onClick={() => this.fileInput.click()}>Choose your content to upload</button>
          <button onClick={this.fileUploadHandler}>Upload content</button>
        </div>

        <div className="Get">
          <input onChange={this.contentSelectedHandler} />
          <button onClick={this.getFile} >Search for content</button>
        </div>
      </div>
    )
  }
}

export default Upload;
