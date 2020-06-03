import React from 'react';
import './Handle.css';
import { YT_API_Helpers } from '../../helpers';

const { formatS } = YT_API_Helpers;

export  default function Handle({
  handle: { id, value, percent },
  getHandleProps
}) {
  return (
    <div
      style={{
        left: `${percent}%`,
        position: 'absolute',
        marginLeft: -15,
        marginTop: 25,
        zIndex: 2,
        width: 40,  // radius of handle
        height: 30, // radius of handle
        border: 0,
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: '50%',
        backgroundColor: '#2C4870',
        color: '#333',
      }}
      {...getHandleProps(id)}
    >
      <div style={{ fontFamily: 'Roboto', fontSize: 11, marginTop: -15 }}>
        {formatS(value)}
      </div>
    </div>
  )
}
