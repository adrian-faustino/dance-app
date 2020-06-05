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

const myPlayerHelpers = {
  closeReplay,
  handleFullScreen,
  toggleLoop,
  togglePlay,
  toggleMirrored
};

export default myPlayerHelpers;