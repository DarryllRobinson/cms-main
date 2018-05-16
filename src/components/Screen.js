import React, { Component } from 'react';
//import { CloudinaryContext, Video } from 'cloudinary-react';
//import {Cloudinary, Configuration, Transformation, Util} from 'cloudinary-core';
//import Video from './Cloudinary/Video';
import Nav from './Nav';
import cloudinary from "cloudinary-core";
import axios from 'axios';

class Screen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tag: 'retail'
    };

  }

  componentDidMount() {
    // this.getIPstack(); // For when we want the device location info
    this.getPlaylist();
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
        console.log('Playlist loaded');
      });

      // Fighting to get the stupid thing to play in full screen without intervention
    /*player.on('timeplayed', (event) => {
      player.maximize();
      console.log(event.eventData.time + " seconds played");
    })*/
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
        <h3 className="text-center">Screen Display</h3>
        <hr/>

        <div className="cloudPlayer">
          <video
            id="example-player"
            controls
            autoPlay
            className="cld-video-player cld-video-player-skin-dark">
          </video>
        </div>
      </div>
    );
  }
}

export default Screen;
