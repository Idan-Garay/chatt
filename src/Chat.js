import 'Chat.css'
import { useState } from 'react';
import socket from './socket';
import User from './User';

export default function Chat() {
  const [selectedUser, setselectedUser] = useState('');
  const [user, setUser] = useState([]);

  return (
    <div>
      <div class="left-panel">
        <user
          v-for="user in users"
          key
          :key="user.userID"
          :user="user"
          :selected="selectedUser === user"
          @select="onSelectUser(user)"
        />
      </div>
      <message-panel
        v-if="selectedUser"
        :user="selectedUser"
        @input="onMessage"
        class="right-panel"
      />
    </div>
  )
}