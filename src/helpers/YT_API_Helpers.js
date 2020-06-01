// example URL https://www.youtube.com/watch?v=nELzF-Uq-28&list=RDnELzF-Uq-28&start_radio=1&t=0
const parseVideoID = str => {
  const videoID = str.split('v=')[1].split('&')[0];

  return videoID;
};

const YT_API_Helpers = {
  parseVideoID
};

export default YT_API_Helpers;