// example URL https://www.youtube.com/watch?v=nELzF-Uq-28&list=RDnELzF-Uq-28&start_radio=1&t=0
const parseVideoID = str => {
  const videoID = str.split('v=')[1].split('&')[0];

  return videoID;
};

const loopStart = (player, start) => {
  player.seekTo(start);
};

const setVidLength = (setState, vidLength) => {
  if (vidLength === 0) {
    return console.log('Invalid video length.');
  }
  console.log('Setting vid length:', vidLength);
  setState(prev => ({...prev, vidLength}));
}

const formatMS = totalMS => {
  let totalMS_ = totalMS;

  const h = Math.floor(totalMS_ / (60 * 60 * 1000));
  if (h > 0) {
    totalMS_ = totalMS_ - (h * 60 * 60 * 1000);
  }

  const m = Math.floor(totalMS_ / (60 * 1000));
  if (m > 0) {
    totalMS_ = totalMS_ - (m * 60 * 1000);
  }

  const s = Math.floor(totalMS_ / (1000));
  if (s > 0) {
    totalMS_ = totalMS_ - (s * 1000);
  }
 
  const ms = totalMS_;

  return {h, m, s, ms};
};

// take total seconds and return a string in HH:MM:SS format
const formatS = totalS => {
  const inMS = totalS * 1000;
  const timeObj = formatMS(inMS);

  const { h, m, s, ms } = timeObj;
  const _h = h === 0 ? '' : h.toString().length < 2 ? `0${h}h` : `${h}h`;
  const _m = m.toString().length < 2 ? `0${m}m` : `${m}m`;
  const _s = s.toString().length < 2 ? `0${s}s` : `${s}s`;

  const formattedTime = `${_h} ${_m} ${_s}`.trim();
  return formattedTime;
};

const YT_API_Helpers = {
  parseVideoID,
  loopStart,
  setVidLength,
  formatMS,
  formatS
};

export default YT_API_Helpers;