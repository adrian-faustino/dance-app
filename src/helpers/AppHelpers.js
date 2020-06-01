const test = () => {
  console.log('Hello test')
};

const updateInput = (setState, currentInput) => {
  setState(prev => ({...prev, currentInput}));
}

const updateVidURL = (setState, youtubeURL) => {
  setState(prev => ({...prev, youtubeURL}));
}

const AppHelpers = {
  test,
  updateInput,
  updateVidURL
};

export default AppHelpers;