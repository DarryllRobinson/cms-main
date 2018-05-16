import React, { Component } from 'react';
//import { CloudinaryContext, Video } from 'cloudinary-react';
//import {Cloudinary, Configuration, Transformation, Util} from 'cloudinary-core';
//import Video from './Cloudinary/Video';
import Nav from './Nav';
import Video from 'cloudinary-video-player';
import cloudinary from "cloudinary-core";
import axios from 'axios';

class Screen extends Component {

  state = {
    videos: []
  };

  getVideos() {
    axios.get('https://res.cloudinary.com/flycrow/video/list/fcm.json')
          .then(res => {
            console.log(res.data.resources);
            this.setState({ videos: res.data.resources.splice(0,12)});
    });
  }

  componentDidMount() {
    //this.getVideos();
    // this.getIPstack(); // For when we want the device location info
    this.getPlaylist();
  }

  getPlaylist() {
    const cld = cloudinary.Cloudinary.new({ cloud_name: 'flycrow' });
    const player = cld.videoPlayer('example-player', {
      playedEventTimes: [1]
    });

    player.playlistByTag('rpns', {
      //sourceParams: { angle: 13 },
      autoAdvance: 0,
      repeat: true
    }).then(function(player)
      {
        //const divElem = document.querySelector("div#playlist-data");
        const list = player.playlist().list().map(function(source) {
          return source.publicId()
        }).join(', ');

        //divElem.innerText = 'Playlist: ' + list;
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

    const { videos } = this.state;

    return (
      <div>
        <Nav />
        <h3 className="text-center">Content Library</h3>
        <hr/>

        <div className="cloudPlayer">
          <video
            id="example-player"
            //controls
            //autoPlay
            className="cld-video-player cld-video-player-skin-dark">
          </video>
          {/*<div className="playlist-data"></div>*/}
        </div>
      </div>
    );
  }
}

export default Screen;
