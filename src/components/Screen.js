import React, { Component } from 'react';
import { CloudinaryContext, Transformation, Video } from 'cloudinary-react';
import cloudinary from 'cloudinary-core';
import 'cloudinary-video-player';

// CSS
import '../../node_modules/cloudinary-video-player/dist/cld-video-player.min.css';

class Screen extends Component {

  render() {

    return (
      <div>
        <video
          id="my-demo-player"
          controls
          autoplay
          class="cld-video-player">
        </video>
      </div>
    );
  }
}

export default Screen;
