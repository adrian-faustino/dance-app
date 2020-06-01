import React from 'react'

export default function SearchField(props) {

  const { currentInput, setState, updateInput, updateVidURL } = props; 

  const _placeholder = 'Enter a YouTube URL...'

  // helpers
  const formSubmitHandler = e => {
    e.preventDefault();
    updateVidURL(setState, currentInput);
  }

  return (
    <form onSubmit={formSubmitHandler}>
      <input
      onChange={e => updateInput(setState, e.target.value)}
      placeholder={_placeholder}/>
      <button>search</button>
    </form>
  )
}
