import React, { useState } from 'react';
import './App.css';

// Containers
import {
  UserVidContainer,
  YoutubeVidContainer,
  SearchField
} from './components';

// Helpers
import { AppHelpers } from './helpers';

// Destructure
const { updateInput, updateVidURL } = AppHelpers;

// constants
const YT_API_KEY = process.env.REACT_APP_YT_API_KEY;

function App() {

  const [state, setState] = useState({
    currentInput: '', // user URL input
    finalInput: null, // user URL input
    stream: ''
  });

  const { currentInput, finalInput, stream } = state;

  return (
    <div className="App">
      
      <SearchField
      currentInput={currentInput}
      setState={setState}
      updateInput={updateInput}
      updateVidURL={updateVidURL}/>

      {finalInput && <YoutubeVidContainer
      finalInput={finalInput}/>}

      <UserVidContainer
      stream={stream}
      setState={setState}/>

    </div>
  );
}

export default App;
