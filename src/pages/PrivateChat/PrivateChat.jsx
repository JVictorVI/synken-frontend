import { useState, useEffect, useRef } from "react";
import webstomp from "webstomp-client";

import default_pfp from "../../assets/undefined_pfp.png";
import style from "./PrivateChat.module.css";
import Navebar from "../../components/Navebar/Navebar";

function PrivateChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const chatUser = JSON.parse(sessionStorage.getItem("chatUser"));
  const sessionUser = JSON.parse(sessionStorage.getItem("user"));

  const socket = new WebSocket("ws://localhost:8080/ws-chat");
  const client = webstomp.over(socket);
  const clientRef = useRef(null);

  useEffect(() => {
    client.connect(
      {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      () => {
        console.log("Conectado");

        // Assina o "tópico privado público"
        client.subscribe(`/topic/private.${sessionUser.username}`, (msg) => {
          const body = JSON.parse(msg.body);
          console.log("Recebida:", body);
          setMessages((prev) => [...prev, body]);
        });

        clientRef.current = client;
      }
    );

    return () => {
      if (client.connected) {
        client.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    const chatMessage = {
      sender: sessionUser.username,
      recipient: chatUser.username, // o nome da pessoa para quem vai enviar
      content: input,
    };

    if (clientRef.current?.connected) {
      clientRef.current.send(
        "/app/chat.sendPrivatePublic",
        JSON.stringify(chatMessage),
        {}
      );

      setMessages((prev) => [...prev, chatMessage]);
      setInput("");
    }
  };

  return (
    <div className={style.privateChat}>
      <Navebar />
      <div className={style.chatBox}>
        <div className={style.profileInfo}>
          <img
            src={chatUser.profilePicture || default_pfp}
            alt={`${chatUser.username}'s profile`}
          />
          <p>{chatUser.username}</p>
        </div>

        {messages.length > 0 ? (
          messages.map((msg, i) => (
            <div
              key={i}
              className={
                msg.sender === sessionUser.username
                  ? style.userMessageBox
                  : style.friendMessageBox
              }
            >
              <p>{msg.content}</p>
            </div>
          ))
        ) : (
          <p className={style.noMessages}>
            Mande uma mensagem para {chatUser.username} para iniciar uma nova
            conversa!
          </p>
        )}

        <div className={style.inputField}>
          {" "}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
          />
          <button onClick={sendMessage}>Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default PrivateChat;
