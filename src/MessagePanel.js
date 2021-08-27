
import React from 'react'
import StatusIcon from './StatusIcon'

export default function MessagePanel({user, index, onSubmit}) {
  return (
    <div>
      <div class="header">
        <StatusIcon connected={connected? 'user.connected': null}> 
          { user.username } 
        </StatusIcon>
      </div>

      <ul class="messages">
        {user.messages.map((message, index) => (
          <li key={index} class="message" >
            <div class="sender">
                { message.fromSelf ? "(yourself)" : user.username }
              </div>
              { message.content }
          </li>
        ))}
      </ul>

      <form onSubmit={onSubmit} class="form">
        <textarea v-model="input" placeholder="Your message..." class="input" />
        <button disabled={!isValid} class="send-button">Send</button>
      </form>
    </div>
  )
}
