import React, { useState } from "react";
import { SiProbot } from "react-icons/si";

const AddNewRole = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");

  return (
    <div className="add-new-role">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          cursor: "pointer",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="new-role-btn">
          <SiProbot />
        </div>
        <h3 style={{ color: "#9baab8" }}>
          <i>New Bot</i>
        </h3>
      </div>
      {isOpen && (
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <input
            className="generate-bot-input"
            placeholder="Generate new bot"
            value={role}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRole(e.target.value)
            }
          />
        </div>
      )}
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#9baab8",
        }}
      />
    </div>
  );
};

export default AddNewRole;
