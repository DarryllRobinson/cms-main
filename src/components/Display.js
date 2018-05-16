import React, { Component } from 'react';
import Nav from './Nav';
import { CloudinaryContext, Video } from 'cloudinary-react';
import axios from 'axios';

class Display extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tag: 'fcm',
      videos: []
    };

    this.handleTagChange = this.handleTagChange.bind(this);
    this.getVideos = this.getVideos.bind(this);
  }

  handleTagChange(event) {
    // updating [tags] in state to send with upload request
    //this.setState({ tag: event.target.value });
    this.setState(state => {
      state.tag = event.target.value;
      return state;
    });
    console.log('tag: ', this.state.tag);
  };

  getVideos(newTag) {
    console.log('tag before: ', this.state.tag);
    this.setState(state => {
      state.tag = newTag;
      return state;
    });
    console.log('tag after: ', this.state.tag);
    axios.get('https://res.cloudinary.com/flycrow/video/list/' + this.state.tag + '.json')
          .then(res => {
            console.log(res.data.resources);
            this.setState({ videos: res.data.resources.splice(0,12)});
    });
  }

  /*componentDidMount() {
    this.getVideos();
  }*/

  render() {

    const { videos }  = this.state;

    return (
      <div>
        <Nav />
        <h3 className="text-center">Content Library</h3>
        <hr/>

        <div className="col-sm-12">
          <input placeholder="Select Content Tag" ></input>
          <button onClick={} className="btn btn-lg btn-info">View Library</button>
          <CloudinaryContext cloudName="flycrow">
            { videos.map((data, index) => (
                <div className="col-sm-4" key={index}>
                  <div className="embed-responsive embed-responsive-4by3">
                    <Video publicId={data.public_id} width="300" height="300" controls></Video>
                  </div>
                  <div> Created at {data.created_at} </div>
                </div>
              ))
            }
          </CloudinaryContext>
        </div>
      </div>
    );
  }
}

export default Display;
