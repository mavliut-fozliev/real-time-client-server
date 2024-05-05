import React, { useRef, useState } from "react";

export default function WebSock() {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");

  const sendMessage = async () => {
    const message = {
      event: "message",
      username,
      id: Date.now(),
      message: value,
    };
    socket.current.send(JSON.stringify(message));
    setValue("");
  };

  function connect() {
    socket.current = new WebSocket("ws://localhost:5000");

    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        username,
        id: Date.now(),
      };
      socket.current.send(JSON.stringify(message));
    };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };

    socket.current.onclose = () => console.log("Connection closed");

    socket.current.onerror = () => console.log("Error");
  }

  if (!connected) {
    return (
      <div>
        <div>
          <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter Your Name" />
          <button onClick={connect}>Enter</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div>
          <input value={value} onChange={(e) => setValue(e.target.value)} type="text" />
          <button onClick={sendMessage}>Send</button>
        </div>
        <div>
          {messages.map((mess, index) => (
            <div key={index}>
              {mess.event === "connection" ? (
                <div>user {mess.username} connected</div>
              ) : (
                <div>
                  {mess.username}. {mess.message}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
