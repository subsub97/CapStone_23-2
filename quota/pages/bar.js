import React, { useState } from "react";

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

const topbarStyles = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "80px",
  position: "fixed",
  padding: "10px 20px",
  backgroundColor: "#ffffff",
  borderBottom: "0.5px solid #a0a0a0",
};

const quotaStyles = {
  color: "#00D295",
  fontSize: "40px",
  fontFamily: "SBAggroB",
  cursor: "pointer",
};

const profileStyles = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontFamily: "Jalnan",
};

const info = {
  width: "100px",
  height: "30px",
  backgroundColor: "#ffffff",
  color: "#000000",
  border: "0.5px solid #a0a0a0",
  fontFamily: "Jalnan",
  fontSize: "14px",
  borderRadius: "12px",
};

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

const buttonStyles = {
  width: "250px",
  height: "50px",
  backgroundColor: "#ffffff",
  color: "#4D377B",
  marginBottom: "10px",
  border: "none",
  cursor: "pointer",
  fontFamily: "Jalnan",
  fontSize: "18px",
  borderRadius: "12px",
};

const listStyles = {
  width: "250px",
  height: "50px",
  marginBottom: "10px",
  backgroundColor: "#CCD1FF",
  color: "#000000",
  border: "none",
  cursor: "pointer",
  fontFamily: "Jalnan",
  fontSize: "16px",
  borderRadius: "12px",
  textAlign: "center",
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
};

function Topbar({ google_name }) {
  const [isSlideBarOpen, setSlideBarOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [chats, setChats] = useState([]);
  const googlename = localStorage.getItem("googlename");
  const googlepicture = localStorage.getItem("googlepicture");

  const handleNewChat = () => {
    const newChat = {
      id: chats.length, // 새로운 채팅의 ID를 생성합니다. 실제 애플리케이션에서는 더 복잡한 ID 생성 방식을 사용할 수 있습니다.
      messages: [], // 새로운 채팅의 메시지 목록을 초기화합니다.
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
        <button style={buttonStyles} onClick={handleNewChat}>
          + 새 채팅 시작
        </button>
        {chats.map((chat) => (
          <div key={chat.id} style={listStyles}>
            {/* 각 채팅의 내용을 렌더링합니다. 이 예시에서는 각 채팅의 ID만 출력합니다. */}
            채팅 ID: {chat.id}
          </div>
        ))}
      </div>
      <div style={topbarStyles}>
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
          <div style={quotaStyles} onClick={gohome}>
            Quota
          </div>
        </div>
        <div style={profileStyles}>
          <div onClick={handleImageClick}>환영합니다, {googlename}</div>
          <img src={googlepicture} alt="Profile" width="40" height="40" />
        </div>
        <div style={slideBarStyles(isSlideBarOpen)}>
          <button onClick={handleLogout} style={info}>
            내 정보 수정
          </button>
          <br></br>
          <button onClick={handleLogout} style={info}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
