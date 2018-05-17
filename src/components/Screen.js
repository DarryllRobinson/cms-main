import React, { Component } from 'react';
//import { CloudinaryContext, Video } from 'cloudinary-react';
//import {Cloudinary, Configuration, Transformation, Util} from 'cloudinary-core';
//import Video from './Cloudinary/Video';
import Nav from './Nav';
import 'cloudinary-video-player';
import cloudinary from "cloudinary-core";
import axios from 'axios';

class Screen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tag: ''
    };

    this.handleTagChange = this.handleTagChange.bind(this);
    this.getPlaylist = this.getPlaylist.bind(this);
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

  componentDidMount() {
    //this.getVideos();
    // this.getIPstack(); // For when we want the device location info
    //this.getPlaylist();
  }

  getPlaylist() {
    const cld = cloudinary.Cloudinary.new({ cloud_name: 'flycrow' });
    const player = cld.videoPlayer('example-player', {
      playedEventTimes: [1]
    });

    player.playlistByTag(this.state.tag, {
      //sourceParams: { angle: 13 },
      autoAdvance: 0,
      repeat: true
    }).then(function(player)
      {
        //const divElem = document.querySelector("div#playlist-data");
        /*const list = player.playlist().list().map(function(source) {
          return source.publicId()
        }).join(', ');*/

        //divElem.innerText = 'Playlist: ' + list;
      });

      player.maximize();
      
  }

  getIPstack() {
    axios.get('http://api.ipstack.com/check?access_key=416692c0c41decfa8027d5604496e3bf')
      .then(res => {
        console.log('res: ', res);
    });
  }

  render() {

    return (
      <div>
        <Nav />
        <h3 className="text-center">Content Library</h3>
        <hr/>

        <input placeholder="Select Content Tag" onChange={this.handleTagChange}></input>
        <button onClick={this.getPlaylist} className="btn btn-lg btn-info">Start Screen Display</button>
        <div className="cloudPlayer">
          <video
            id="example-player"
            controls
            autoPlay
            className="cld-video-player cld-video-player-skin-dark">
          </video>
          {/*<div className="playlist-data"></div>*/}
        </div>
      </div>
    );
  }
}

export default Screen;
