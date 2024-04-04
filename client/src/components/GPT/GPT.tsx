import { FC } from "react";
import { IoMdClose } from "react-icons/io";
import "./GPT.css";
import SendToGtp from "./SendToGtp";
import GptChatPLace from "./GptChatPLace";
import { useGptStore } from "../../store/GPTStore";
const Gpt: FC<{ setIsOpenGPT: (v: boolean) => void }> = ({ setIsOpenGPT }) => {
  const { closeGpt, gpt_messages } = useGptStore();
  
  const handleCloseGpt = () => {
    if (gpt_messages.length > 0) {
      const confirmClose = window.confirm(
        "If you confirm to close ChatGPT the data will removed!"
      );
      if (confirmClose) {
        setIsOpenGPT(false);
        closeGpt();
      }
    }

    setIsOpenGPT(false);
  };

  return (
    <div className="chat-gpt">
      <button onClick={handleCloseGpt} className="close-chat-gpt">
        <IoMdClose />
      </button>
      <GptChatPLace />
      <SendToGtp />
    </div>
  );
};

export default Gpt;
