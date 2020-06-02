// example URL https://www.youtube.com/watch?v=nELzF-Uq-28&list=RDnELzF-Uq-28&start_radio=1&t=0
const parseVideoID = str => {
  const videoID = str.split('v=')[1].split('&')[0];

  return videoID;
};

const loopStart = (player, start) => {
  player.seekTo(start);
};

const setStart = (setState, e) => {
  const number = e.target.value;
  if(isNaN(number)) { return console.log('Enter a number! ')};

  console.log('Setting start time', e.target.value);
// setState(prev => ({...prev, start: e.target.value}));
};

const setEnd = (setState, e) => {
  console.log('Setting end time', e);
  // setState(prev => ({...prev, end: e.target.value}));
};

const setVidLength = (setState, vidLength) => {
  if (vidLength === 0) {
    return console.log('Invalid video length.');
  }
  console.log('Setting vid length:', vidLength);
  setState(prev => ({...prev, vidLength}));
}

const YT_API_Helpers = {
  parseVideoID,
  loopStart,
  setStart,
  setEnd,
  setVidLength
};

export default YT_API_Helpers;