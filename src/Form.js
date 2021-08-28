import { useState } from 'react'

const Form = ({onMessage, setMessage}) => {

  return (
    <div>
      <form onSubmit={onMessage}>
        <input type="text" id="message" onChange={e => setMessage(e.target.value)}></input>
        <button>Send</button>
      </form>
    </div>
  )
}

export default Form;