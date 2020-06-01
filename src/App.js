import React, { useState } from 'react';
import './App.css';

// Containers
import {
  UserVidContainer,
  VidControlsContainer,
  YoutubeVidContainer
} from './components';

// Helpers
import { AppHelpers } from './helpers';

// Destructure
const { test } = AppHelpers;

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
      
      <button
      onClick={() => {
        
      }}
      >Test</button>

      <UserVidContainer />
      <VidControlsContainer />
      <YoutubeVidContainer />
    </div>
  );
}

export default App;
