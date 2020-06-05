import React from 'react'
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import './MainSlider.css';

// subcomponents
import { Handle, Track, Tick } from '.';

export default function MainSlider(props) {

  const { start, end, vidLength, setState } = props;


  const sliderStyle = {  // Give the slider some width
    position: 'relative',
    width: '100%',
    height: 80,
    // border: '1px solid steelblue',
  }
  
  const railStyle = {
    position: 'absolute',
    width: '100%',
    height: 10,
    marginTop: 35,
    borderRadius: 5,
    backgroundColor: '#8B9CB6',
  }

  return (
    <div>
    <Slider
        rootStyle={sliderStyle}
        domain={[0, vidLength]}
        step={1}
        mode={2}
        values={[start, vidLength * 0.9] /* three values = three handles */}
        onChange={e => {
          const [start, end] = e;
          console.log('Slider time:', start, end)
          setState(prev => ({...prev, start, end}));
        }}
      >
        <Rail>
          {({ getRailProps }) => (
            <div style={railStyle} {...getRailProps()} />
          )}
        </Rail>
        <Handles>
          {({ handles, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map(handle => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left={false} right={false}>
          {({ tracks, getTrackProps }) => (
            <div className="slider-tracks">
              {tracks.map(({ id, source, target }) => (
                <Track
                  key={id}
                  source={source}
                  target={target}
                  getTrackProps={getTrackProps}
                />
              ))}
            </div>
          )}
        </Tracks>
        <Ticks 
        count={10 /* generate approximately 15 ticks within the domain */}>
          {({ ticks }) => (
            <div className="slider-ticks">
              {ticks.map(tick => (
                <Tick key={tick.id} tick={tick} count={ticks.length} />
              ))}
            </div>
          )}
        </Ticks>
      </Slider>
    </div>
  )
}
