import webstomp from "webstomp-client";
import api from "../../components/api/api";
import {
  decryptMessage,
  encryptMessage,
} from "../../Service/EncryptionService";
import { getDateTime } from "../../Service/GeneralService";

export const connectPrivateChat = (username, token, key, onMessage) => {
  const socket = new WebSocket("ws://localhost:8080/ws-chat");
  const client = webstomp.over(socket);

  client.connect({ Authorization: `Bearer ${token}` }, () => {
    console.log("Conectado");

    client.subscribe(`/topic/private.${username}`, (msg) => {
      const body = JSON.parse(msg.body);
      const decryptedContent = decryptMessage(body.content, key);
      onMessage({ ...body, content: decryptedContent });
    });
  });

  return client;
};

export const fetchMessages = async (sender, receiver, key) => {
  const response = await api.get(`/chat/messages/${sender}/${receiver}`);
  const decrypted = response.data.messages.map((msg) => ({
    ...msg,
    content: decryptMessage(msg.content, key),
  }));

  return {
    chatInfo: response.data,
    messages: sortMessagesByDate(decrypted),
  };
};

export const sendPrivateMessage = (client, message, key, setMessages) => {
  const encryptedContent = encryptMessage(message.content, key);
  const payload = {
    ...message,
    content: encryptedContent,
    createdAt: getDateTime(),
  };

  if (client?.connected) {
    client.send("/app/chat.sendPrivate", JSON.stringify(payload), {});
    setMessages((prev) => [...prev, { ...payload, content: message.content }]);
  }
};

export const sortMessagesByDate = (msgArray) => {
  return [...msgArray].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
};
