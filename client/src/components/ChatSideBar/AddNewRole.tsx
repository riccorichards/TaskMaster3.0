import React, { useEffect, useRef, useState } from "react";
import { SiProbot } from "react-icons/si";
import { useBotStore } from "../../store/BotStore";

const AddNewRole = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const { createBotRole } = useBotStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && isOpen) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleAddRole = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && role !== "") {
      createBotRole({ role });
      setRole("");
      setIsOpen(false);
    }
  };

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
            ref={inputRef}
            className="generate-bot-input"
            placeholder="Generate new bot"
            value={role}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRole(e.target.value)
            }
            onKeyDown={handleAddRole}
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
