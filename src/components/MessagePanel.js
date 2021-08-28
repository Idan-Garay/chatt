
import React, { useState } from 'react'
import StatusIcon from './StatusIcon'
import './MessagePanel.css'

export default function MessagePanel({user, onSubmit}) {
  const [input, setInput] = useState('');

  const onTextChange = e => setInput(e.target.value);
  const displaySender = (message, index) => index === 0 || (user.messages[index-1].fromSelf !== user.messages[index.fromSelf])

  return (
    <div>
      <div className="header">
        <StatusIcon connected={user.connected}> 
          { user.username } 
        </StatusIcon>
      </div>

      <ul className="messages">
        {user.messages.map((message, index) => (
          <li key={index} className="message" >
            {
              displaySender(message, index)
              ? (<div className="sender">
                    { message.fromSelf ? "(yourself)" : user.username }
                </div>)
              : null
            }
              { message.content }
          </li>
        ))}
      </ul>

      <form onSubmit={() => onSubmit(input)} className="form">
        <textarea onChange={onTextChange} placeholder="Your message..." className="input" />
        <button disabled={!(input.length > 0)} className="send-button">Send</button>
      </form>
    </div>
  )
}
