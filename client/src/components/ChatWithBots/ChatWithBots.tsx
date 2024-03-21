import { useEffect } from "react";
import { useBotStore } from "../../store/BotStore";
import ChatSideBar from "../ChatSideBar/ChatSideBar";
import "./ChatWithBots.css";
import ChatPlace from "../ChatPlace/ChatPlace";

const ChatWithBots = () => {
  const { interactWithBot, messages } = useBotStore();
  const greeting =
    messages.length > 0 && messages[0].msg.startsWith("Hi, I'm Matthew,");

  useEffect(() => {
    if (greeting) return;

    const tID = setTimeout(() => {
      interactWithBot("");
    }, 1000);

    return () => clearTimeout(tID);
  }, [interactWithBot, greeting]);

  return (
    <div className="chat-bots-wrapper">
      <div className="chat-side-bar-wrapper">
        <ChatSideBar />
      </div>
      <div className="chat-place-wrapper">
        <ChatPlace />
      </div>
    </div>
  );
};

export default ChatWithBots;
