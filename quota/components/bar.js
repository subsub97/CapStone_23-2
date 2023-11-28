import React, { useState } from "react";
import styles from "@/styles/Bar.module.css";

const sidebarStyles = (isOpen) => ({
  height: "calc(100vh - 80px)",
  width: "300px",
  position: "fixed",
  top: "80px",
  backgroundColor: "#dde5ff",
  padding: "20px",
  overflow: "auto",
  transition: "transform 0.3s ease-in-out",
  transform: isOpen ? "translateX(0)" : "translateX(-100%)",
  borderRight: "0.5px solid #a0a0a0",
});

const slideBarStyles = (isOpen) => ({
  position: "fixed",
  top: "50px",
  right: "0",
  width: "200px",
  height: "10vh",
  visibility: isOpen ? "visible" : "hidden",
  transition: "transform 0.3s ease-in-out",
  transform: isOpen ? "translateY(0%)" : "translateY(-10%)",
  padding: "10px",
});

function Topbar({ google_name }) {
  const [isSlideBarOpen, setSlideBarOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [chats, setChats] = useState([]);
  const googlename = localStorage.getItem("googlename");
  const googlepicture = localStorage.getItem("googlepicture");

  const handleNewChat = () => {
    const newChat = {
      id: chats.length,
      messages: [],
    };
    setChats([...chats, newChat]);
  };

  const handleImageClick = () => {
    setSlideBarOpen(!isSlideBarOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  const gohome = () => {
    window.location.href = "/main";
  };

  return (
    <div>
      <div style={sidebarStyles(isSidebarOpen)}>
        <button className={styles.buttonStyles} onClick={handleNewChat}>
          + 새 채팅 시작
        </button>
        {chats.map((chat) => (
          <div key={chat.id} className={styles.listStyles}>
            {}
            채팅 ID: {chat.id}
          </div>
        ))}
      </div>
      <div className={styles.topbarStyles}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={handleSidebarToggle}
            style={{ border: "none", background: "none", marginLeft: "10px" }}
          >
            <img src="/toggle.png" alt="button image" />
          </button>
          <img
            src="/quota.png"
            alt="quota image"
            style={{
              border: "none",
              background: "none",
              marginLeft: "30px",
              marginBottom: "3px",
              cursor: "pointer",
            }}
            onClick={gohome}
          ></img>
          <div className={styles.quotaStyles} onClick={gohome}>
            Quota
          </div>
        </div>
        <div className={styles.profileStyles}>
          <div onClick={handleImageClick}>환영합니다, {googlename}님</div>
          <img src={googlepicture} alt="Profile" width="40" height="40" />
        </div>
        <div style={slideBarStyles(isSlideBarOpen)}>
          <button onClick={handleLogout} className={styles.info}>
            내 정보 수정
          </button>
          <br></br>
          <button onClick={handleLogout} className={styles.info}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
