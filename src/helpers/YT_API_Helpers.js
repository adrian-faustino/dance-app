// example URL https://www.youtube.com/watch?v=nELzF-Uq-28&list=RDnELzF-Uq-28&start_radio=1&t=0
const parseVideoID = str => {
  const videoID = str.split('v=')[1].split('&')[0];

  return videoID;
};

const setPlayer = () => {
  const playerConfig = {
    // height: '360',
    // width: '640',
    // videoId: videoId,
    // playerVars: {
    //   autoplay: 1, // Auto-play the video on load
    //   controls: 0, // Show pause/play buttons in player
    //   showinfo: 0, // Hide the video title
    //   modestbranding: 1, // Hide the Youtube Logo
    //   fs: 1, // Hide the full screen button
    //   cc_load_policy: 0, // Hide closed captions
    //   iv_load_policy: 3, // Hide the Video Annotations
    //   start: startSeconds,
    //   end: endSeconds,
    //   autohide: 0, // Hide video controls when playing
    // },
    // events: {
    //   'onStateChange': onStateChange
    // }
  };

  // return player = new YT.Player('ytplayer', playerConfig);
};


const loopStart = (player, start) => {
  player.seekTo(start);
};

const YT_API_Helpers = {
  parseVideoID,
  setPlayer,
  loopStart
};

export default YT_API_Helpers;