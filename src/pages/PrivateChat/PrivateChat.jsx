import { useState, useEffect, useRef } from "react";
import webstomp from "webstomp-client";

import default_pfp from "../../assets/undefined_pfp.png";
import style from "./PrivateChat.module.css";
import Navebar from "../../components/Navebar/Navebar";

import api from "../../components/api/api";
import { formatDateString, formatTime } from "../../Service/GeneralService";

import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function PrivateChat() {
  const [chatContent, setChatContent] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const chatUser = JSON.parse(sessionStorage.getItem("chatUser"));
  const sessionUser = JSON.parse(sessionStorage.getItem("user"));

  const socket = new WebSocket("ws://localhost:8080/ws-chat");
  const client = webstomp.over(socket);
  const clientRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Busca as mensagens anteriores entre os usuários
    api
      .get(`/chat/messages/${sessionUser.username}/${chatUser.username}`)
      .then((response) => {
        console.log("Mensagens recebidas:", response.data.messages);
        setChatContent(response.data);
        setMessages(response.data.messages);
      })
      .catch((error) => {
        console.error("Erro ao buscar mensagens:", error);
      });
  }, []);

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
      senderUsername: sessionUser.username,
      receiverUsername: chatUser.username, // o nome da pessoa para quem vai enviar
      content: input,
    };

    if (clientRef.current?.connected) {
      clientRef.current.send(
        "/app/chat.sendPrivate",
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
          <button
            className={style.backButton}
            onClick={() => navigate("/chats")}
          >
            <IoIosArrowBack className={style.icon} size={25} />
          </button>
          <div className={style.profileCenter}>
            <img
              src={chatUser.profilePicture || default_pfp}
              alt={`${chatUser.username}'s profile`}
            />
            <p>{chatUser.username}</p>
          </div>
        </div>

        {chatContent.createdAt ? (
          <span>
            {" "}
            Conversa iniciada em {formatDateString(chatContent.createdAt)}{" "}
          </span>
        ) : null}

        {messages.length > 0 ? (
          messages.map((msg, i) => (
            <div
              className={
                msg.senderUsername === sessionUser.username
                  ? style.userMessage
                  : style.friendMessage
              }
              key={i}
            >
              {msg.senderUsername === sessionUser.username ? (
                <span>
                  {" "}
                  {formatTime(msg.createdAt)}, {formatDateString(msg.createdAt)}
                </span>
              ) : null}
              <div
                key={i}
                className={
                  msg.senderUsername === sessionUser.username
                    ? style.userMessageBox
                    : style.friendMessageBox
                }
              >
                <p>{msg.content}</p>
              </div>

              {msg.senderUsername != sessionUser.username ? (
                <span>
                  {" "}
                  {formatTime(msg.createdAt)}, {formatDateString(msg.createdAt)}
                </span>
              ) : null}
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
