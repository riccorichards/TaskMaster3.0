import { MdOutlineRemove } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { GrRobot } from "react-icons/gr";
import { useBotStore } from "../../store/BotStore";

const BotHeader = () => {
  const { botAction } = useBotStore();

  const handleBotHide = () => {
    botAction("hide");
  };
  const handleBotClose = () => {
    botAction("close");
  };
  const handleBotOpen = () => {
    botAction("open");
  };
  return (
    <div className="bot-header">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontSize: "18px",
          color: "#ccd0cf",
          cursor: "pointer",
        }}
        onClick={handleBotOpen}
      >
        <GrRobot />
        Matthew
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontSize: "18px",
          color: "#ccd0cf",
        }}
      >
        <MdOutlineRemove
          onClick={handleBotHide}
          style={{ cursor: "pointer" }}
        />
        <IoMdClose onClick={handleBotClose} style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
};

export default BotHeader;
