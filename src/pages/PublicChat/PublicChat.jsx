import React, { useState, useEffect, useRef } from "react";
import webstomp from "webstomp-client";

function PublicChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const clientRef = useRef(null);
  const token = sessionStorage.getItem("token");

  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws-chat");
    const client = webstomp.over(socket);

    client.connect(
      { Authorization: `Bearer ${token}` },
      () => {
        client.subscribe("/topic/public", (msg) => {
          const body = JSON.parse(msg.body);
          setMessages((prev) => [...prev, body]);
        });
      },
      (error) => {
        console.error("Erro na conexão WebSocket:", error);
      }
    );

    clientRef.current = client;

    return () => {
      if (client.connected) {
        client.disconnect();
      }
    };
  }, [token]);

  const sendMessage = () => {
    if (!input.trim()) return;

    if (!clientRef.current || !clientRef.current.connected) {
      console.warn("WebSocket não está conectado");
      return;
    }

    const chatMessage = {
      sender: currentUser.username,
      content: input.trim(),
      type: "CHAT",
    };

    clientRef.current.send(
      "/app/chat.sendMessage",
      JSON.stringify(chatMessage),
      {}
    );
    setInput("");
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", maxWidth: 400 }}>
      <h3>Chat Público</h3>
      <div
        style={{
          height: 200,
          overflowY: "scroll",
          marginBottom: 10,
          border: "1px solid #ddd",
          padding: 5,
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>
              {msg.sender === currentUser.username ? "Você" : msg.sender}
            </strong>
            : {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
        placeholder="Digite sua mensagem..."
        style={{ width: "100%", padding: "5px" }}
      />
      <button onClick={sendMessage} style={{ marginTop: 5, width: "100%" }}>
        Enviar
      </button>
    </div>
  );
}

export default PublicChat;
