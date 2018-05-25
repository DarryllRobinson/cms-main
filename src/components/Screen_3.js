import React, { Component } from 'react';
import Nav from './Nav';

class Screen extends Component {

  render() {

    return (
      <div>
        <Nav />
        <h3 className="text-center">Content Library</h3>
        <hr/>

        <video width="400" controls>
         <source src="C:\Users\drobinson\Documents\projects\cms-main\src\components\videos\Star - 6962.mp4" type="video/mp4" />
         Your browser does not support HTML5 video.
        </video>

      </div>
    );
  }
}

export default Screen;
