import React, { useEffect, useRef } from 'react'
import './UserVidContainer.css';
import constants from '../constants';
import { Spinner } from 'reactstrap';
import { myPlayerHelpers } from '../helpers';

const { PLAYER_WIDTH, PLAYER_HEIGHT } = constants;
const { closeReplay, handleFullScreen, toggleLoop, togglePlay } = myPlayerHelpers;

export default function UserVidContainer(props) {

  const { state, setState } = props;
  const { stream, mediaRecorder, isRecording, videoURL, cameraEnabled, myPlayerOpts } = state;
  const { isLooping, isMirrored, isPlaying } = myPlayerOpts;

  const captureWindow = useRef();
  const replayWindow = useRef();
  const replayWindowParent = useRef();

  // handle myPlayer Play/Pause
  useEffect(() => {
    if (!replayWindow.current) return;
    isPlaying ? replayWindow.current.pause() : replayWindow.current.play();
  }, [isPlaying]);


  const handleDataAvailable = e => {
    const chunks = [e.data];
    const blob = new Blob(chunks, { type : 'video/mp4;' });
    const videoURL = window.URL.createObjectURL(blob);

    setState(prev => ({...prev, videoURL}));
  }

  // useEffect(() => {
  //   if (navigator.mediaDevices.getUserMedia) {
  //     navigator.mediaDevices.getUserMedia({ video: { width: PLAYER_WIDTH, height: PLAYER_HEIGHT } })
  //       .then(stream => {
  //         captureWindow.current.srcObject = stream;
  //         const mediaRecorder = new MediaRecorder(stream);
  //         // mediaRecorder.ondataavailable = handleDataAvailable;

  //         setState(prev => ({...prev, stream, mediaRecorder}));
  //       })
  //       .catch(err => console.log(err));
  //   }
  // }, []);

  // listener for data chunks
  useEffect(() => {
    if (mediaRecorder) {
      mediaRecorder.ondataavailable = handleDataAvailable;
    }
  }, [mediaRecorder]);

  // record buttons
  const startRecord = e => {
    e.preventDefault();
    if (!isRecording && cameraEnabled) {
      const isRecording = true;
      setState(prev => ({...prev, isRecording, videoURL: null}));
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
    if (!cameraEnabled) {
      navigator.mediaDevices.getUserMedia({ video: { width: PLAYER_WIDTH, height: PLAYER_HEIGHT } })
        .then(stream => {
          captureWindow.current.srcObject = stream;
          const mediaRecorder = new MediaRecorder(stream);
          setState(prev => ({...prev, stream, mediaRecorder, cameraEnabled: true}));
        })
        .catch(err => console.log(err));
    }
  }

  const disableCam = e => {
    if (cameraEnabled && !isRecording) {
      e.preventDefault();
      stream.getVideoTracks()[0].stop();
      setState(prev => ({...prev, stream: null, mediaRecorder: null, cameraEnabled: false}));
    }
  }

  const videoDimensions = {
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
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

      {videoURL && 
      /** UserVid Control Buttons **/
      <div
      ref={replayWindowParent}
      className={`UserVidContainer__replay-container`}>
        <div>
          <span>Replay mode</span>
          <button 
          className="UserVidContainer__close-replay-btn"
          onClick={e => closeReplay({e, setState})}>x</button>

          <div>Time Bar</div>
          
          {/* PLAY/PAUSE */}
          <button onClick={e => togglePlay({e, isPlaying, setState})}>{isPlaying ? 'Play' : 'Pause'}</button>
          {/* LOOP TOGGLE */}
          <button onClick={e => toggleLoop({e, isLooping, setState})}>{isLooping ? 'Stop Loop' : 'Loop'}</button>
        
     
          <button onClick={''}>Play</button>
          <button onClick={''}>Pause</button>
        </div>
    

        <video
        onEnded={e => togglePlay({ e, isPlaying, setState })}
        loop={isLooping}
        className={`UserVidContainer__replay-window ${isMirrored && 'mirrored'}`}
        controls={true}
        ref={replayWindow}
        style={videoDimensions}
        src={videoURL}>
        </video>
      </div>}


      {isRecording ? 
        (<button className="danger-btn button" onClick={stopRecord}>Stop</button>) : 
        (<button className={`positive-btn button ${!cameraEnabled && 'disabled-btn'}`} onClick={startRecord}>Record</button>) }

      {cameraEnabled ? 
        (<button className={`standard-btn button ${isRecording && 'disabled-btn'}`} onClick={disableCam}>Disable Camera</button>) : 
        (<button className="standard-btn button" onClick={enableCam}>Enable Camera</button>) }

      {isRecording && (<div className="UserVidContainer__recording-status">
        <Spinner color="success"
        className="spinner-grow"/>
        <span>Recording...</span>
      </div>)}

      <button onClick={e => {
        e.preventDefault();
        console.log('works', replayWindow);
        // jump to time
        // replayWindow.current.currentTime=10;

        // full screen
        // replayWindowParent.current.requestFullscreen();
        // replayWindowParent.current.onfullscreenchange = e => handleFullScreen({e, replayWindow});

        // play
        // replayWindow.current.play();

        // pause
        // replayWindow.current.pause();

        // loop
        // replayWindow.current.loop = toggleLoop({e, isLooping, setState});

        // mirror
        // setState(prev => ({...prev, myPlayerOpts: { isMirrored: !isMirrored}}))
      }}>Jump time</button>

    </div>
  )
}
