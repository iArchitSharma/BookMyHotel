import React from "react";

const Popover = ({ content, position }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "10px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      {content}
    </div>
  );
};

export default Popover;