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

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { content: newMessage, sender: "user" }]);

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/uploading/text/",
          { text: newMessage },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setMessages([
            ...messages,
            { content: newMessage, sender: "user" },
            { content: response.data.message, sender: "AI" },
          ]);
          setNewMessage("");
        } else {
          console.log("서버에서 응답이 올바르지 않습니다.");
        }
      } catch (error) {
        console.error("메시지 전송 실패", error);
      }
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
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/uploading/pdf/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setMessages([
          ...messages,
          { content: `Uploaded file: ${selectedFileName}`, sender: "file" },
        ]);
      } else {
        setMessages([
          ...messages,
          { content: `Uploaded fail: ${selectedFileName}`, sender: "file" },
        ]);
      }

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
    const aiMessage = "더치트 \n gd ";
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
                  Array.isArray(message.content) ? (
                    message.content.map((text, i) => <p key={i}>{text}</p>)
                  ) : (
                    <TypeAnimation
                      sequence={[message.content, 1000]}
                      wrapper="span"
                      speed={50}
                      repeat={Infinity}
                      cursor={false}
                    />
                  )
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
