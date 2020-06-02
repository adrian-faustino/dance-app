import React, { useState, useEffect } from 'react'
import axios from 'axios';
import YouTube from 'react-youtube';
import { VidControlsContainer } from '.';

// helpers
import { YT_API_Helpers } from '../helpers';

// destructure
const { parseVideoID, loopStart, setVidLength } = YT_API_Helpers;

// constants
const YT_API_KEY = process.env.REACT_APP_YT_API_KEY;

// yt constants - set 0 to disable
const PLAYER_HEIGHT = 390;
const PLAYER_WIDTH = 640;


export default function YoutubeVidContainer(props) {
  const { finalInput } = props;

  // state
  const [state, setState] = useState({
    player: null,
    videoID: null,
    start: 3,
    end: 8,
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
        if (!vidLength) { setVidLength(setState, player.getDuration()) }
      }}
      onReady={e => {
        const player = e.target;
        setState(prev => ({...prev, player}));
      }}/>

      {vidLength && (
      <VidControlsContainer
      start={start}
      end={end}
      vidLength={vidLength}
      player={player}
      setState={setState}/>)}


      <button onClick={e => {
        e.preventDefault();
        console.log(player);
        console.log('CLICKED =>', player.getDuration());
        console.log('viddata', player.getAvailablePlaybackRates());
      }}>click me!</button>
    </div>
  )
}
