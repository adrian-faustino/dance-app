import React, { useEffect, useRef } from 'react'
import './UserVidContainer.css';

export default function UserVidContainer(props) {

  const { stream, setState } = props;

  const captureWindow = useRef();

  useEffect(() => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
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
    // console.log(stream.getVideoTracks()[0].getConstraints());
  }

  const stopRecord = e => {
    e.preventDefault();
    console.log('Stopped recording...')
  }

  const closeCam = e => {
    e.preventDefault();
    stream.getVideoTracks()[0].stop();
  }

  return (
    <div>
      <div id="container">
        <video autoplay="true" id="videoElement" ref={captureWindow}>
        
        </video>
      </div>
      
      <button onClick={startRecord}>Record</button>
      <button onClick={stopRecord}>Stop</button>
      <button onClick={closeCam}>Close cam</button>
    </div>
  )
}
