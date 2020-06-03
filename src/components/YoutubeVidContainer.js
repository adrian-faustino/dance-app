import React, { useState, useEffect } from 'react'
import axios from 'axios';
import YouTube from 'react-youtube';
import { VidControlsContainer } from '.';
import './YoutubeVidContainer.css';
import { Spinner } from 'reactstrap';

// helpers
import { YT_API_Helpers } from '../helpers';
import constants from '../constants';

// destructure
const { parseVideoID, loopStart, setVidLength } = YT_API_Helpers;

// constants
const YT_API_KEY = process.env.REACT_APP_YT_API_KEY;
const { WINDOW_WIDTH, WINDOW_HEIGHT, PLAYER_WIDTH, PLAYER_HEIGHT, SPINNER_RADIUS } = constants;


export default function YoutubeVidContainer(props) {
  const { finalInput } = props;

  // state
  const [state, setState] = useState({
    player: null,
    videoID: '0b_L1CzZTwI',
    start: 0,
    end: 280,
    controls: 1, // controls show on player or not
    looping: true, // change if user doesn't want looping
    vidLength: null
  });
  const { player, videoID, start, end, controls, looping, vidLength } = state;


  // handle user video search input
  useEffect(() => {
    if (finalInput) {
      if (finalInput.includes('youtube.com')) {
        const videoID = parseVideoID(finalInput);
        setState(prev => ({...prev, videoID}));
      } else {
        const query = finalInput.split(' ').join('+');
        const searchString = `https://www.googleapis.com/youtube/v3/search?key=${YT_API_KEY}&part=snippet&type=video&q=${query}`;
  
        axios.get(searchString)
          .then(res => {
            console.log(res.data.items);
          })
          .catch(err => console.log(err));
      }
    }
  }, [finalInput]);

  // Reset all the values whenever a user sets new video
  useEffect(() => {
    console.log('Resetting video length.');
    setState(prev => ({...prev, vidLength: null}));
  }, [videoID]);


  // YT Player settings
  const opts = {
    height: PLAYER_HEIGHT,
    width: PLAYER_WIDTH,
    playerVars: {
      controls,
      start,
      end,
      autoplay: 1,
    },
  };

  return (
    <div>
      <YouTube 
      videoId={videoID} 
      opts={opts} 
      onEnd={looping ? () => loopStart(player, start) : null}
      onStateChange={e => {
        if (!vidLength) setVidLength(setState, player.getDuration());
      }}
      onReady={e => {
        const player = e.target;
        setState(prev => ({...prev, player}));
      }}/>

      {vidLength ? (<>
      <span className="YoutubeVidContainer__label label">Loop Range</span>
      <VidControlsContainer
      start={start}
      end={end}
      vidLength={vidLength}
      player={player}
      setState={setState}/></>) : <Spinner style={SPINNER_RADIUS} color="secondary"/>}


      {/* <button 
      style={{zIndex: 90}}
      onClick={e => {
        e.preventDefault();
        console.log(player);
        console.log('CLICKED =>', player.getDuration());
        console.log('viddata', player.getCurrentTime());
        console.log('Window width', WINDOW_WIDTH);
      }}>click me!</button> */}
    </div>
  )
}
