import React from 'react'
import { MainSlider } from './VidControls';

export default function VidControlsContainer(props) {

  const { start, end, vidLength, player, setState } = props;

  return (
    <div>
      <MainSlider
      start={start}
      end={end}
      vidLength={vidLength}
      setState={setState}/>
    </div>
  )
}
