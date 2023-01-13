import { useEffect, useState } from 'react'
import { io, Socket } from 'Socket.IO-client'

// const socketClient = io("http://localhost:3000/", {
//  path: "/api/socketio",
//     // transports: ["websocket"],
// });
// console.log(socketClient);
// socketClient.onAny((...args) => {
//     console.log(args);
// });
// socketClient.on("connect", () => {
//     console.log("socket 连接成功");
// });
// socketClient.on("connect_error", (err) => {
//     console.log("socket 连接err", err);
// });

let socket: Socket

export default function ChatRoom() {
  const [input, setInput] = useState('')

  const onChangeHandler = e => {
    setInput(e.target.value)
    socket.emit('input-change', e.target.value)
  }

  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io()
    socket.on('connect', () => {
      console.log('connected')
    })
    socket.on('update-input', msg => {
      setInput(msg)
    })
  }

  useEffect(() => {
    socketInitializer()
  }, [])

  return <div style={{margin:'40px auto',width:400}}>
  <div>{input}</div>
  <input placeholder='Type something' value={input} onChange={onChangeHandler} />
  </div>
}
