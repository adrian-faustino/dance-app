import React, { useState } from 'react';
import './App.css';

// Containers
import {
  UserVidContainer,
  VidControlsContainer,
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
    currentInput: '',
    youtubeURL: null,
  });

  const { currentInput, youtubeURL } = state;

  return (
    <div className="App">
      
      <SearchField
      currentInput={currentInput}
      setState={setState}
      updateInput={updateInput}
      updateVidURL={updateVidURL}/>
      <UserVidContainer />
      <VidControlsContainer />
      <YoutubeVidContainer />

      { currentInput }
      { youtubeURL }
    </div>
  );
}

export default App;
