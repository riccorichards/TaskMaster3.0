import React, { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useBotStore } from "../../store/BotStore";

const SendMsg = () => {
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { interactWithBot, msgTaker } = useBotStore();
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
      msgTaker({ author: "you", msg: input });
      setTimeout(() => {
        interactWithBot(input);
      }, 500);
      setInput("");
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
      />
      <button onClick={() => sendCmd()}>
        <IoIosSend />
      </button>
    </div>
  );
};

export default SendMsg;