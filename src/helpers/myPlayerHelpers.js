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
  const { e, isLooping, setState } = vars;
  e.preventDefault();
  setState(prev => ({...prev, myPlayerOpts: { isLooping: !isLooping}}));
}

const myPlayerHelpers = {
  closeReplay,
  handleFullScreen,
  toggleLoop
};

export default myPlayerHelpers;