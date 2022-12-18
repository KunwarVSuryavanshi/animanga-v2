import React from 'react'
import ReactPlayer from 'react-player';
import { useLocation, useParams } from 'react-router-dom'
import './Player.scss';

function Player() {
  const { epInfo } = useParams();
  const state = useLocation();

  return (
    <div>
      EPinfo - {epInfo}
      {console.log(state)}
      <div className="player">
        <ReactPlayer
          className="react-player"
          url={
            "https://cache.387e6278d8e06083d813358762e0ac63.com/ca3c8540-7bee-11ed-91e1-80615f085c1a.m3u8?videoid=222956098130"
          }
          // file={}
          width="100%"
          height="100%"
          controls={true}
          light={true}
        />
      </div>
    </div>
  );
}

export default Player