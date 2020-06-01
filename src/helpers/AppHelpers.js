const test = () => {
  console.log('Hello test')
};

const updateInput = (setState, currentInput) => {
  setState(prev => ({...prev, currentInput}));
}

const updateVidURL = (setState, finalInput) => {
  setState(prev => ({...prev, finalInput}));
}

const AppHelpers = {
  test,
  updateInput,
  updateVidURL
};

export default AppHelpers;