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

  getFile = event => {
    this.setState({
      fileToGet: event.target.value
    })
  }

  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('content', this.state.selectedFile, this.state.selectedFile.name);
    console.log('this.state.selectedFile.name: ', this.state.selectedFile.name);
    console.log('this.state.selectedFile: ', this.state.selectedFile);

  /*  axios.post('http://localhost:8080/api/contents', {
      filename: this.state.selectedFile.name
    })
    .then(function (res) {
      console.log('res: ', res);
    })
    .catch(function (err) {
      console.log('err: ', err);
    });

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    console.log('e:', e);
    //console.log('filename', this.fileName);
    //data.append('filename', this.fileName.value);

    fetch('http://localhost:8080/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ contentURL: `http://localhost:8080/api/contents/upload/${body.file}` });
      });
    });
  }
*/

    fetch('http://localhost:8080/api/contents/upload', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'/*,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    */  },
      body: fd
      /*body: {
        name: this.state.selectedFile.name,
        filename: this.state.selectedFile
      }*/
    })

    /*
    axios.post('http://localhost:8080/api/contents/upload/', fd, {
      onUploadProgress: progressEvent => {
        console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
      }

    })
      .then(res => {
        console.log(res);
      });
      */
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
          <input onChange={this.fileSelectedHandler} />
          <button onClick={this.getFile} >Search for content</button>
      </div>
    )
  }
}

  /*handleUpload(e) {
    e.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    console.log('e:', e);
    //console.log('filename', this.fileName);
    //data.append('filename', this.fileName.value);

    fetch('http://localhost:8080/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ contentURL: `http://localhost:8080/api/contents/upload/${body.file}` });
      });
    });
  }

  render() {

    return (
      <form ref='uploadForm'
      id='uploadForm'
      action='http://localhost:8080/api/contents/upload'
      method='post'
      encType="multipart/form-data">
        <input type="file" name="sampleFile" />
        <input type='submit' value='Upload' />
    </form>
    );
  }
}*/

export default Upload;
