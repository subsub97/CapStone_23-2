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
};

const profileStyles = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontFamily: "Jalnan",
};

const slideBarStyles = (isOpen) => ({
  position: "fixed",
  top: "70px",
  right: "0",
  width: "200px",
  height: "10vh",
  transition: "transform 0.3s ease-in-out",
  transform: isOpen ? "translateX(40%)" : "translateX(100%)",
  padding: "10px",
  zIndex: 3,
});

const buttonStyles = {
  width: "250px",
  height: "50px",
  backgroundColor: "#ffffff",
  color: "#4D377B",
  fontSize: "20px",
  border: "none",
  cursor: "pointer",
  fontFamily: "Jalnan",
  fontSize: "18px",
  borderRadius: "12px",
};

function Topbar({ google_name }) {
  const [isSlideBarOpen, setSlideBarOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleImageClick = () => {
    setSlideBarOpen(!isSlideBarOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <div>
      <div style={sidebarStyles(isSidebarOpen)}>
        <button style={buttonStyles}>+ 새 채팅 시작</button>
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
            }}
          ></img>
          <div style={quotaStyles}>Quota</div>
        </div>
        <div style={profileStyles}>
          <div>환영합니다, 양진혁님</div>
          {/* {google_name} */}
          <img
            src="profile.jpg"
            alt="Profile"
            width="40"
            height="40"
            onClick={handleImageClick}
          />
        </div>
        <div style={slideBarStyles(isSlideBarOpen)}>
          <button onClick={handleLogout}>내 정보 수정</button>
          <br></br>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
