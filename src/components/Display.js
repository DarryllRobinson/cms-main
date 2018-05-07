import React, { Component } from 'react';
import Nav from './Nav';
import { CloudinaryContext, Video } from 'cloudinary-react';
import axios from 'axios';

class Display extends Component {

  state = { videos: [] };

  getVideos() {
    axios.get('https://res.cloudinary.com/flycrow/video/list/fcm.json')
          .then(res => {
            console.log(res.data.resources);
            this.setState({ videos: res.data.resources.splice(0,12)});
    });
  }

  componentDidMount() {
    this.getVideos();
  }

  render() {

    const { videos }  = this.state;

    return (
      <div>
        <Nav />
        <h3 className="text-center">Content Library</h3>
        <hr/>

        <div className="col-sm-12">
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
