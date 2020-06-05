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

const updateInterval = (currentTimeTickInterval, myPlayerOpts, setState) => {
  console.log('Creating new tick interval...', currentTimeTickInterval);
  const _myPlayerOpts = {...myPlayerOpts, currentTimeTickInterval};
  setState(prev => ({...prev, myPlayerOpts: _myPlayerOpts}));
}

const setCurrentTime = (replayWindow, myPlayerOpts, setState) => {
  const currentTimeTickInterval =
    setInterval(() => {
    const currentTime = replayWindow.current.currentTime;
    const _myPlayerOpts = {...myPlayerOpts, currentTime};
    console.log('Current time:', replayWindow.current.currentTime)
    setState(prev => ({...prev, myPlayerOpts: _myPlayerOpts, currentTimeTickInterval}));
    }, 500);
}

const clearCurrentTime = (currentTimeTickInterval, myPlayerOpts, setState) => {
  console.log('Interval cleared!', currentTimeTickInterval);

  // This is the hackiest sh*t I've ever used
  for (let i = 1; i < 99999; i++) { window.clearInterval(i); }
  const _myPlayerOpts = {...myPlayerOpts, currentTimeTickInterval: null};
  setState(prev => ({...prev, myPlayerOpts: _myPlayerOpts}));
}

const myPlayerHelpers = {
  closeReplay,
  handleFullScreen,
  toggleLoop,
  togglePlay,
  toggleMirrored,
  handleTimebar,
  setCurrentTime,
  clearCurrentTime,
  updateInterval
};

export default myPlayerHelpers;