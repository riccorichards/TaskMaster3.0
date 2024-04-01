import React, { useEffect, useRef, useState } from "react";
import { useBotStore } from "../../store/BotStore";

const SendMsg = () => {
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { interactWithBot, msgTaker, pickedRole } = useBotStore();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const sendCmd = () => {
    if (input !== "") {
      msgTaker({ author: "you", msg: input, role: pickedRole });
      setTimeout(() => {
        interactWithBot(input.toLowerCase().trim(), pickedRole);
      }, 500);
      setInput("");
    }
  };

  const handleOnClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendCmd();
    }
  };
  return (
    <div className="send-message">
      <input
        ref={inputRef}
        type="text"
        placeholder="type..."
        value={input}
        onChange={onChange}
        onKeyDown={handleOnClick}
      />
    </div>
  );
};

export default SendMsg;
