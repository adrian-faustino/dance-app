import React, { useEffect, useRef } from 'react'
import './UserVidContainer.css';
import constants from '../constants';
import { Spinner } from 'reactstrap';
import { myPlayerHelpers } from '../helpers';

// Constants
const { PLAYER_WIDTH, PLAYER_HEIGHT } = constants;

// myPlayer Helper Functions
const { closeReplay, handleFullScreen, toggleLoop, togglePlay, toggleMirrored, handleTimebar, setCurrentTime, clearCurrentTime, updateInterval } = myPlayerHelpers;

export default function UserVidContainer(props) {

  const { state, setState } = props;
  const { stream, mediaRecorder, isRecording, videoURL, cameraEnabled, myPlayerOpts } = state;
  const { isLooping, isMirrored, isPlaying, currentTime } = myPlayerOpts;

  const captureWindow = useRef();
  const replayWindow = useRef();
  const replayWindowParent = useRef();

  // handle myPlayer Play/Pause - Replay video custom buttons
  useEffect(() => {
    if (!replayWindow.current) return;
    isPlaying ? replayWindow.current.pause() : replayWindow.current.play();
  }, [isPlaying]);

  
  /** START: mediaRecorder set up (to record user webcame) **/
  const handleDataAvailable = e => {
    const chunks = [e.data];
    const blob = new Blob(chunks, { type : 'video/mp4;' });
    const videoURL = window.URL.createObjectURL(blob);

    setState(prev => ({...prev, videoURL}));
  }
  
  useEffect(() => {
    if (mediaRecorder) {
      mediaRecorder.ondataavailable = handleDataAvailable;
    }
  }, [mediaRecorder]);
  /** END: mediaRecorder set up (to record user webcame) **/


  /** START: Record buttons helper functions **/
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
  /** END: Record buttons helper functions **/

  // Video Player dimensions
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

          {/* TIMEBAR */}
          <div
          onClick={e => handleTimebar({e, replayWindow})}
          className="UserVidContainer__timebar">Time Bar</div>
          
          {/* PLAY/PAUSE */}
          <button onClick={e => {
            togglePlay({e, isPlaying, myPlayerOpts, setState})}}>{isPlaying ? 'Play' : 'Pause'}</button>
          {/* LOOP TOGGLE */}
          <button onClick={e => toggleLoop({e, isLooping, myPlayerOpts, setState})}>{isLooping ? 'Stop Loop' : 'Loop'}</button>
          {/* MIRROR TOGGLE */}
          <button onClick={e => toggleMirrored({e, isMirrored, myPlayerOpts, setState})}>{isMirrored ? 'Stop Mirror' : 'Mirror'}</button>
        
        </div>
        {currentTime}

        <video
        onTimeUpdate={e => setCurrentTime(e.target, myPlayerOpts, setState)}
        onEnded={e => {
          console.log('Video ended!')
          togglePlay({ e, isPlaying, myPlayerOpts, setState })}}
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

    </div>
  )
}
