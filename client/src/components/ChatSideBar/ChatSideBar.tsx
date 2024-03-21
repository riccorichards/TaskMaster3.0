import AddNewRole from "./AddNewRole";
import BotList from "./BotList";
import "./ChatSideBar.css";
import SearchBot from "./SearchBot";
const ChatSideBar = () => {
  return (
    <div className="chat-side-bar">
      <AddNewRole />
      <SearchBot />
      <BotList />
    </div>
  );
};

export default ChatSideBar;
