import React, { Component } from 'react';
import { CloudinaryContext, Transformation, Video } from 'cloudinary-react';

class Screen extends Component {

  render() {

    return (
      <div>
        <CloudinaryContext cloudName="flycrow">
          <div className="embed-responsive embed-responsive-4by3" >
            <Video id="myVideo" publicId="test/vqx5qsaltgwwoocpgbb2" autoPlay>
              <Transformation width="250" height="150" crop="pad" />
            </Video>
          </div>
        </CloudinaryContext>
      </div>
    );
  }
}

export default Screen;
