import React from 'react'

export default function Input({ placeholder, handleInput, name }) {

  return (
    <div>
        <input 
            name={name}
            className='input-field' 
            placeholder={placeholder}
            onChange={handleInput}
        />
    </div>
  )
}
