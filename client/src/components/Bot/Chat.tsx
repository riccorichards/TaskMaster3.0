import { GrRobot } from "react-icons/gr";
import { useBotStore } from "../../store/BotStore";
import { useUserStore } from "../../store/AuthStore";
import { useEffect, useRef } from "react";

const Chat = () => {
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
    <div className="bot-chat">
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
              <GrRobot />
            </div>
          ) : (
            <div className="user-icon-wrapper">{authorNick}</div>
          )}
          <span className="message-wrapper">{msg.msg}</span>
          <div ref={inVisibleElRef} />
        </div>
      ))}
    </div>
  );
};

export default Chat;
