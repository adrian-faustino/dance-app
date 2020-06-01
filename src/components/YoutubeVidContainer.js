import React, { useState, useEffect } from 'react'
import axios from 'axios';

// helpers
import { YT_API_Helpers } from '../helpers';

// destructure
const { parseVideoID } = YT_API_Helpers;

// constants
const YT_API_KEY = process.env.REACT_APP_YT_API_KEY;

// yt constants - set 0 to disable
const loop = 1;
const controls = 1;

export default function YoutubeVidContainer(props) {
  const { finalInput } = props;

  // state
  const [state, setState] = useState({
    videoID: null
  });
  const { videoID } = state;


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

  return (
    <div>
      <iframe width="420" height="315"
        src={`https://www.youtube.com/embed/${videoID}?playlist=${videoID}&loop=${loop}&controls=${controls}`}>
      </iframe>
    </div>
  )
}
