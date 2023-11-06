import { useState } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

export default function Document() {
  const [messages, setMessages] = useState([]);
  const handleSendMessage = (message) => {
    // 메시지를 보낼 때 처리 로직을 추가하세요
    // 여기에서는 메시지 목록을 업데이트하여 화면에 메시지를 표시합니다.
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        message,
        sentTime: new Date().toLocaleTimeString(),
        sender: "User",
        direction: "outgoing",
      },
    ]);
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: 100,
        right: 500,
        width: "100vh",
        height: "80vh",
      }}
    >
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map((message, index) => (
              <Message key={index} model={message} />
            ))}
          </MessageList>
          <MessageInput
            onAttachClick={logHi}
            placeholder="Type message here"
            onSend={(message) => handleSendMessage(message)}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
