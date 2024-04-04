import { useEffect, useRef } from "react";
import { useGptStore } from "../../store/GPTStore";
import GptResponse from "./Gpt-Response";
import { useUserStore } from "../../store/AuthStore";

const GptChatPLace = () => {
  const { gpt_messages } = useGptStore();
  const { user } = useUserStore();
  const authorNick = user && user.username.slice(0, 2).toLocaleUpperCase();
  const inVisibleElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inVisibleElRef.current) {
      inVisibleElRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [inVisibleElRef, gpt_messages]);

  return (
    <div className="gpt-chat-place">
      {gpt_messages.map((msg, i) => (
        <div key={i}>
          {msg.role === "assistant" && (
            <GptResponse message={msg.message} i={i} />
          )}
          {msg.role === "user" && (
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #9baab8",
                  backgroundColor: "#06141b",
                  color: "#9baab8",
                  flexGrow: 0,
                  flexShrink: 0,
                }}
              >
                {authorNick}
              </div>
              <span
                style={{
                  padding: "3.5px 5px",
                  backgroundColor: "#06141b",
                  color: "#9baab8",
                  borderRadius: "0 5px 5px 5px",
                }}
              >
                {msg.message}
              </span>
            </div>
          )}
        </div>
      ))}
      <div ref={inVisibleElRef} style={{ height: "15vh" }} />
    </div>
  );
};

export default GptChatPLace;
