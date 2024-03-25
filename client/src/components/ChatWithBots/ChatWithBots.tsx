import ChatSideBar from "../ChatSideBar/ChatSideBar";
import "./ChatWithBots.css";
import ChatPlace from "../ChatPlace/ChatPlace";
import { useToolsStore } from "../../store/ToolsStore";

const ChatWithBots = () => {
  const { screenSize } = useToolsStore();

  return (
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
  );
};

export default ChatWithBots;
