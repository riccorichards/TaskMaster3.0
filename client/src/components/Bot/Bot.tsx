import { useEffect } from "react";
import { useBotStore } from "../../store/BotStore";
import "./Bot.css";
import BotHeader from "./BotHeader";
import SendMsg from "./SendMsg";
import Chat from "./Chat";

const Bot = () => {
  const { bot, interactWithBot, messages } = useBotStore();
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
    <>
      {bot === "hide" ? (
        <div className="hidden-bot">
          <BotHeader />
        </div>
      ) : (
        <div className="bot-wrapper">
          <BotHeader />
          <Chat />
          <SendMsg />
        </div>
      )}
    </>
  );
};

export default Bot;
