import React, { useEffect } from 'react'
import { MainSlider } from './VidControls';
import constants from '../constants';
import './VidControlsContainer.css'

export default function VidControlsContainer(props) {

  const { start, end, vidLength, player, setState } = props;

  const playbackButtons = player
    .getAvailablePlaybackRates()
    .map(rate => (
      <button className="standard-btn button" key={rate} onClick={e =>{
        e.preventDefault();
        player.setPlaybackRate(rate);
      }}>{rate * 100 + '%'}</button>
    ));
  
  const _style = {
    width: constants.PLAYER_WIDTH * 0.95,
  }

  return (
    <div 
    className="VidControlsContainer__main-container"
    style={_style}>
      <MainSlider
      start={start}
      end={end}
      vidLength={vidLength}
      setState={setState}/>

      <hr />

      <span className="label">Playback Speed</span>
      <div className="VidControlsContainer__speed-buttons">
        {playbackButtons}
      </div>
    </div>
  )
}
