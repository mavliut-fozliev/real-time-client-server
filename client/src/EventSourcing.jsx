import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EventSourcing() {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  const sendMessage = async () => {
    await axios.post("http://localhost:5000/new-messages", {
      message: value,
      id: Date.now(),
    });
  };

  async function subscribe() {
    const eventSource = new EventSource("http://localhost:5000/connect");
    eventSource.onmessage = function (event) {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
    eventSource.onerror = function (error) {
      console.error("EventSource failed:", error);
    };
  }

  useEffect(() => {
    subscribe();
  }, []);

  return (
    <div>
      <div>
        <div>
          <input value={value} onChange={(e) => setValue(e.target.value)} type="text" />
          <button onClick={sendMessage}>Send</button>
        </div>
        <div>
          {messages.map((mess, index) => (
            <div key={index}>{mess.message}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
