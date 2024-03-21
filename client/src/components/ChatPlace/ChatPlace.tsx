import { useEffect, useRef } from "react";
import { useUserStore } from "../../store/AuthStore";
import { useBotStore } from "../../store/BotStore";
import { SiProbot } from "react-icons/si";
import "./ChatPlace.css";
import SendMsg from "./SendMsg";

const ChatPlace = () => {
  const { messages } = useBotStore();
  const { user } = useUserStore();
  const authorNick = user && user.username.slice(0, 2).toLocaleUpperCase();
  const inVisibleElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inVisibleElRef.current) {
      inVisibleElRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [inVisibleElRef, messages]);

  return (
    <div className="chat-place">
      <div className="messages-wrapper">
        {messages.map((msg, i) => (
          <div
            key={i}
            className="single-msg"
            style={{
              alignSelf: msg.author === "bot" ? "flex-start" : "flex-end",
            }}
          >
            {msg.author === "bot" ? (
              <div className="bot-icon-wrapper">
                <SiProbot />
              </div>
            ) : (
              <div className="user-icon-wrapper">{authorNick}</div>
            )}
            <span className="message-wrapper">{msg.msg}</span>
            <div ref={inVisibleElRef} />
          </div>
        ))}
      </div>
      <SendMsg />
    </div>
  );
};

export default ChatPlace;
