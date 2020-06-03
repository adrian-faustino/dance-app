import React from 'react';
import './SearchField.css';

export default function SearchField(props) {

  const { currentInput, setState, updateInput, updateVidURL } = props; 

  const _placeholder = 'Enter a YouTube URL...'

  // helpers
  const formSubmitHandler = e => {
    e.preventDefault();
    updateVidURL(setState, currentInput);
    updateInput(setState, '');
  }

  return (
    <form 
    className="SearchField__form"
    onSubmit={formSubmitHandler}>
      <input
      value={currentInput}
      className="SearchField__input"
      onChange={e => updateInput(setState, e.target.value)}
      placeholder={_placeholder}/>
      <button
      className="SearchField__button">Search</button>
    </form>
  )
}
