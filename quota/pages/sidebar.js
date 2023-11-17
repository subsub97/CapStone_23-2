import React, { useState } from "react";
const sidebarStyles = (isOpen) => ({
  height: "100vh",
  width: "300px",
  position: "fixed",
  backgroundColor: "#dde5ff",
  padding: "20px",
  overflow: "auto",
  transition: "transform 0.3s ease-in-out",
  transform: isOpen ? "translateX(0)" : "translateX(-100%)",
});

function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div style={sidebarStyles(isSidebarOpen)}></div>
    </div>
  );
}

export default Sidebar;