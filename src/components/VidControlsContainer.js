import React, { useEffect } from 'react'
import { MainSlider } from './VidControls';

export default function VidControlsContainer(props) {

  const { start, end, vidLength, player, setState } = props;

  const playbackButtons = player
    .getAvailablePlaybackRates()
    .map(rate => (
      <button key={rate} onClick={e =>{
        e.preventDefault();
        player.setPlaybackRate(rate);
      }}>{rate}</button>
    ));
  

  return (
    <div>
      <MainSlider
      start={start}
      end={end}
      vidLength={vidLength}
      setState={setState}/>

      <div>
        {playbackButtons}
      </div>
    </div>
  )
}
