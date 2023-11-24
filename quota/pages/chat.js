import React, { useEffect, useState, useRef } from "react";
import styles from "@/styles/Chat.module.css";
import { TypeAnimation } from "react-type-animation";
import axios from "axios";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const chatMessagesRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { content: newMessage, sender: "user" }]);
      setNewMessage("");
    }
  };

  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setSelectedFileName(selectedFile.name);
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
      } else {
        console.log("Unsupported file type. Please select a PDF file.");
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      console.log("파일을 선택하세요.");
      return;
    }

    const formData = new FormData();
    formData.append("files", file);

    try {
      setMessages([
        ...messages,
        { content: `Uploaded file: ${selectedFileName}`, sender: "file" },
      ]);

      // axios.post("http://localhost:8080/upload", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });

      setFile(null);
      setSelectedFileName("");
    } catch (error) {
      console.error("파일 업로드 실패", error);
    }
  };

  const handleSendAndUpload = () => {
    if (newMessage.trim() && file) {
      handleSendMessage();
      handleUpload();
    } else if (newMessage.trim()) {
      handleSendMessage();
    } else if (file) {
      handleUpload();
    }
  };

  const handleSendAIMessage = () => {
    const aiMessage = "회사명 : 더치트 주식회사 (TheCheat Corporation) \n하이요";
    setMessages([...messages, { content: aiMessage, sender: "AI" }]);
  };

  return (
    <div className={styles.parentContainer}>
      <div className={styles.chatContainer}>
        <button onClick={handleSendAIMessage}>AI 메시지 보내기</button>
        <div className={styles.chatMessages} ref={chatMessagesRef}>
          {messages.map((message, index) => (
            <div
              className={styles.messageContainer}
              key={index}
              style={{ textAlign: message.sender === "AI" ? "left" : "right" }}
            >
              <div
                className={styles.message}
                style={{
                  backgroundColor:
                    message.sender === "AI"
                      ? "blue"
                      : message.sender === "file"
                      ? "#008d62"
                      : "#5347cd",
                }}
              >
                {message.sender === "AI" ? (
                  <TypeAnimation
                  sequence={[message.content, 1000]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  cursor={false}
                />
                
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.chatInput}>
          <label htmlFor="ex_file">
            <div className="btnStart">
              <img src="/file.png" />
            </div>
          </label>
          <input
            type="file"
            accept=".pdf"
            id="ex_file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <input
            type="text"
            placeholder="메세지를 입력하세요"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className={styles.input}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSendAndUpload();
              }
            }}
          />
          {selectedFileName && <div>{selectedFileName}</div>}
          <button onClick={handleSendAndUpload} className={styles.button}>
            <img src="/send.png" alt="send image" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
