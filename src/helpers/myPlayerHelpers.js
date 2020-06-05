const closeReplay = vars => {
  const { e, setState } = vars;
  e.preventDefault();
  setState(prev => ({...prev, videoURL: null}));
}

const handleFullScreen = vars => {
  const { e, replayWindow } = vars;
  console.log('Went full screen!', e);
  replayWindow.current.style.height = '100%';
  replayWindow.current.style.width = '100%';
}

const toggleLoop = vars => {
  const { e, isLooping, myPlayerOpts, setState } = vars;
  e.preventDefault();
  const _myPlayerOpts = {...myPlayerOpts, isLooping: !isLooping};
  setState(prev => ({ ...prev, myPlayerOpts: _myPlayerOpts }));
}

const togglePlay = vars => {
  const { e, isPlaying, myPlayerOpts, setState } = vars;
  e.preventDefault();
  const _myPlayerOpts = {...myPlayerOpts, isPlaying: !isPlaying};
  setState(prev => ({ ...prev, myPlayerOpts: _myPlayerOpts }));
}

const toggleMirrored = vars => {
  const { e, isMirrored, myPlayerOpts, setState } = vars;
  e.preventDefault();
  const _myPlayerOpts = {...myPlayerOpts, isMirrored: !isMirrored};
  setState(prev => ({ ...prev, myPlayerOpts: _myPlayerOpts }));
}

const handleTimebar = vars => {
  const { e, replayWindow } = vars;
  const divInfo = e.target.getBoundingClientRect();
  // x and y are the div's coords relative to client window
  // width and height are the bar's dimensions
  const { x, y, width, height } = divInfo;
  const mouse_x = e.clientX;

  const base_x = mouse_x - x;
  const percentageOfBar = base_x / width;

  console.log(percentageOfBar)
  console.log('Controller =>', replayWindow)

  //update current time => setState
  // setInterval(() => {
  //   console.log('Current time:', replayWindow.current.currentTime)
  // }, 1000);
}

const setCurrentTime = (replayWindow, myPlayerOpts, setState) => {
  const currentTime = replayWindow.currentTime;
  const _myPlayerOpts = {...myPlayerOpts, currentTime};
  console.log(currentTime)
  setState(prev => ({...prev, myPlayerOpts: _myPlayerOpts}));
}

const setDuration = (replayWindow, myPlayerOpts, setState) => {
  const replayDuration = replayWindow.duration;
  console.log('Max time is', replayDuration);
  const _myPlayerOpts = {...myPlayerOpts, replayDuration};
  setState(prev => ({...prev, myPlayerOpts: _myPlayerOpts}));
}

/** Returns a string formatted for CSS i.e `43%` **/
const getCSSpercent = (min, max) => {
  console.log(min, max)
  // console.log('CSS PERCENT!',  ( min / max ) * 100 + '%')
  return ( min / max ) * 100 + '%';
}

const myPlayerHelpers = {
  closeReplay,
  handleFullScreen,
  toggleLoop,
  togglePlay,
  toggleMirrored,
  handleTimebar,
  setCurrentTime,
  setDuration,
  getCSSpercent
};

export default myPlayerHelpers;