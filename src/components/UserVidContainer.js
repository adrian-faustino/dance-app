import React, { useEffect, useRef } from 'react'
import './UserVidContainer.css';
import constants from '../constants';

const { PLAYER_WIDTH, PLAYER_HEIGHT } = constants;

export default function UserVidContainer(props) {

  const { state, setState } = props;
  const { stream, mediaRecorder, isRecording, videoURL } = state;

  const captureWindow = useRef();
  const displayWindow = useRef();

  const handleDataAvailable = e => {
    const chunks = [e.data];
    const blob = new Blob(chunks, { type : 'video/mp4;' });
    const videoURL = window.URL.createObjectURL(blob);
    console.log('My blob', blob)
    console.log('My blob', videoURL)
    setState(prev => ({...prev, videoURL}));
  }

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { width: PLAYER_WIDTH, height: PLAYER_HEIGHT } })
        .then(stream => {
          captureWindow.current.srcObject = stream;
          const mediaRecorder = new MediaRecorder(stream);
          // mediaRecorder.ondataavailable = handleDataAvailable;

          setState(prev => ({...prev, stream, mediaRecorder}));
        })
        .catch(err => console.log(err));
    }
  }, []);

  // listener for data chunks
  useEffect(() => {
    if (mediaRecorder) {
      mediaRecorder.ondataavailable = handleDataAvailable;
      // mediaRecorder.onstop = handleBlob;
    }
  }, [mediaRecorder]);

  // record buttons
  const startRecord = e => {
    e.preventDefault();
    if (!isRecording) {
      const isRecording = true;
      setState(prev => ({...prev, isRecording}));
      console.log('Started recording...')
      mediaRecorder.start();
      console.log(mediaRecorder);
    }
  }

  const stopRecord = e => {
    e.preventDefault();
    if (isRecording) {
      const isRecording = false;
      setState(prev => ({...prev, isRecording}));
      console.log('Stopped recording...')
      mediaRecorder.stop();
    }
  }

  const enableCam = e => {
    e.preventDefault();

    navigator.mediaDevices.getUserMedia({ video: { width: PLAYER_WIDTH, height: PLAYER_HEIGHT } })
      .then(stream => {
        captureWindow.current.srcObject = stream;
        setState(prev => ({...prev, stream}));
      })
      .catch(err => console.log(err));
  }

  const disableCam = e => {
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
        // src={videoURL ? videoURL : ''}
        style={videoDimensions}
        autoplay="true" id="videoElement" ref={captureWindow}>
        </video>
      </div>
      
      <button className="positive-btn button" onClick={startRecord}>Record</button>
      <button className="danger-btn button" onClick={stopRecord}>Stop</button>
      <button className="standard-btn button" onClick={enableCam}>Enable Camera</button>
      <button className="standard-btn button" onClick={disableCam}>Disable Camera</button>

      <video
        controls
        ref={displayWindow}
        style={videoDimensions}
        src={videoURL}>
        </video>

    </div>
  )
}
