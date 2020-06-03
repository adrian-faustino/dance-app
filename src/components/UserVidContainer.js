import React, { useEffect, useRef } from 'react'
import './UserVidContainer.css';
import constants from '../constants';

const { PLAYER_WIDTH, PLAYER_HEIGHT } = constants;

export default function UserVidContainer(props) {

  const { stream, setState } = props;

  const captureWindow = useRef();

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { width: PLAYER_WIDTH, height: PLAYER_HEIGHT } })
        .then(stream => {
          // console.log('reference', captureWindow.current.srcObj)
          // console.log('User accepted stream!', stream.getVideoTracks()[0]);
          captureWindow.current.srcObject = stream;
          setState(prev => ({...prev, stream}));
        })
        .catch(err => console.log(err));
    }
  }, []);

  // record buttons
  const startRecord = e => {
    e.preventDefault();
    console.log('Started recording...')
  }

  const stopRecord = e => {
    e.preventDefault();
    console.log('Stopped recording...')
  }

  const openCam = e => {
    e.preventDefault();

    navigator.mediaDevices.getUserMedia({ video: { width: PLAYER_WIDTH, height: PLAYER_HEIGHT } })
      .then(stream => {
        captureWindow.current.srcObject = stream;
        setState(prev => ({...prev, stream}));
      })
      .catch(err => console.log(err));
  }

  const closeCam = e => {
    e.preventDefault();
    stream.getVideoTracks()[0].stop();
    setState(prev => ({...prev, stream: null}));
  }

  const videoDimensions = {
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT
  }

  return (
    <div>
      <div
      style={videoDimensions}
      id="container">
        <video
        style={videoDimensions}
        autoplay="true" id="videoElement" ref={captureWindow}>
        </video>
      </div>
      
      <button onClick={startRecord}>Record</button>
      <button onClick={stopRecord}>Stop</button>
      <button onClick={closeCam}>Enable Camera</button>
      <button onClick={openCam}>Disable Camera</button>
    </div>
  )
}
