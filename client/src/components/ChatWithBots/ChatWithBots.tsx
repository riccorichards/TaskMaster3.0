import ChatSideBar from "../ChatSideBar/ChatSideBar";
import "./ChatWithBots.css";
import ChatPlace from "../ChatPlace/ChatPlace";
import { useToolsStore } from "../../store/ToolsStore";
import { useBotStore } from "../../store/BotStore";
import { useEffect } from "react";
import { useGptStore } from "../../store/GPTStore";
import Gpt from "../GPT/GPT";

const ChatWithBots = () => {
  const { screenSize } = useToolsStore();
  const { interactWithBot, messages } = useBotStore();
  const { useGPT } = useGptStore();
  const greeting =
    messages.length > 0 && messages[0].msg.startsWith("Hi, I'm Matthew,");

  useEffect(() => {
    if (greeting) return;

    const tID = setTimeout(() => {
      interactWithBot("", "");
    }, 1000);

    return () => clearTimeout(tID);
  }, [interactWithBot, greeting]);

  return (
    <>
      {useGPT ? (
        <Gpt />
      ) : (
        <div className="chat-bots-wrapper">
          {screenSize > 425 ? (
            <>
              <div className="chat-side-bar-wrapper">
                <ChatSideBar />
              </div>
              <div className="chat-place-wrapper">
                <ChatPlace />
              </div>
            </>
          ) : (
            <ChatPlace />
          )}
        </div>
      )}
    </>
  );
};

export default ChatWithBots;
