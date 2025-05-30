import { useState, useEffect, useRef } from "react";

import default_pfp from "../../assets/undefined_pfp.png";
import style from "./PrivateChat.module.css";
import Navebar from "../../components/Navebar/Navebar";

import { formatDateString, formatTime } from "../../Service/GeneralService";

import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  connectPrivateChat,
  fetchMessages,
  sendPrivateMessage,
} from "./PrivateChatService";
import { deriveSymmetricKey } from "../../Service/EncryptionService";

function PrivateChat() {
  const [chatContent, setChatContent] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const chatUser = JSON.parse(sessionStorage.getItem("chatUser"));
  const sessionUser = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("token");

  const key = deriveSymmetricKey(sessionUser.id, chatUser.id);
  const clientRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMessages(sessionUser.username, chatUser.username, key)
      .then(({ chatInfo, messages }) => {
        setChatContent(chatInfo);
        setMessages(messages);
      })
      .catch((err) => console.error("Erro ao buscar mensagens:", err));
  }, []);

  useEffect(() => {
    const client = connectPrivateChat(
      sessionUser.username,
      token,
      key,
      (newMessage) => {
        setMessages((prev) => [...prev, newMessage]);
      }
    );

    clientRef.current = client;

    return () => {
      if (client.connected) {
        client.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    const message = {
      senderUsername: sessionUser.username,
      receiverUsername: chatUser.username,
      content: input,
    };

    sendPrivateMessage(clientRef.current, message, key, setMessages);
    setInput("");
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
