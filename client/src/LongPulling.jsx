import React, { useEffect, useState } from "react";
import axios from "axios";

export default function LongPulling() {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  const sendMessage = async () => {
    await axios.post("http://localhost:5000/new-messages", {
      message: value,
      id: Date.now(),
    });
  };

  async function subscribe() {
    try {
      const { data } = await axios.get("http://localhost:5000/get-messages");
      setMessages((prev) => [data, ...prev]);
      await subscribe();
    } catch (e) {
      setTimeout(() => {
        subscribe();
      }, 500);
    }
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
