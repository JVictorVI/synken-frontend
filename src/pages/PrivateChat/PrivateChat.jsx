import { useState, useEffect, useRef } from "react";

import default_pfp from "../../assets/undefined_pfp.png";
import style from "./PrivateChat.module.css";
import Navebar from "../../components/Navebar/Navebar";

import webstomp from "webstomp-client";

import {
  formatDateString,
  formatTime,
  getDateTime,
} from "../../Service/GeneralService";

import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { sortMessagesByDate } from "./PrivateChatService";
import {
  decryptMessage,
  deriveSymmetricKey,
  encryptMessage,
} from "../../Service/EncryptionService";
import api from "../../components/api/api";

function PrivateChat() {
  const [chatContent, setChatContent] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const chatUser = JSON.parse(sessionStorage.getItem("chatUser"));
  const sessionUser = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("token");

  const key = deriveSymmetricKey(sessionUser.id, chatUser.id);
  const clientRef = useRef(null);

  const socket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
  const client = webstomp.over(socket);
  client.debug = () => {};

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await api.get(
          `/chat/messages/${sessionUser.username}/${chatUser.username}`
        );

        const decryptedMessages = response.data.messages.map((msg) => ({
          ...msg,
          content: decryptMessage(msg.content, key),
        }));
        const sortedMessages = sortMessagesByDate(decryptedMessages);
        setChatContent(response.data);
        setMessages(sortedMessages);
      } catch (error) {
        console.error("Erro ao buscar mensagens:", error);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    client.connect({ Authorization: `Bearer ${token}` }, () => {
      client.subscribe(
        import.meta.env.VITE_WEBSOCKET_TOPIC + `.${sessionUser.username}`,
        (msg) => {
          const body = JSON.parse(msg.body);
          const decryptedContent = decryptMessage(body.content, key);

          setMessages((prev) => [
            ...prev,
            { ...body, content: decryptedContent },
          ]);
        }
      );

      clientRef.current = client;
    });

    return () => {
      if (client.connected) {
        client.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    const encryptedContent = encryptMessage(input, key);

    const chatMessage = {
      senderUsername: sessionUser.username,
      receiverUsername: chatUser.username, // o nome da pessoa para quem vai enviar
      content: encryptedContent, // conteúdo criptografado
      createdAt: getDateTime(), // data e hora atual formatada
    };

    if (clientRef.current?.connected) {
      clientRef.current.send(
        import.meta.env.VITE_SEND_TOPIC,
        JSON.stringify(chatMessage),
        {}
      );

      setMessages((prev) => [
        ...prev,
        {
          ...chatMessage,
          content: decryptMessage(encryptedContent, key),
        },
      ]);

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
