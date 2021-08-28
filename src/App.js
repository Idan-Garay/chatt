import { useEffect } from 'react';
import socket from './socket';

export default function App() {

  useEffect(() => {
    socket.connect();

    return () => {
      socket.close()
    }
  });
  
  if (socket.connected)
    console.log('hey')

  return (
    <div>Hello World</div>
  )
}