import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/AuthStore";
import Navigation from "./Navigation";
import "./SideBar.scss";
import Logo from "../header/logo/Logo";
import Utils from "../../utils/Utils";
import { RiLogoutBoxLine } from "react-icons/ri";
import { HiMiniVideoCamera } from "react-icons/hi2";
import { GrRobot } from "react-icons/gr";
import { useBotStore } from "../../store/BotStore";

const SideBar = () => {
  const { logOut, user } = useUserStore();
  const navigate = useNavigate();
  const { botAction, bot } = useBotStore();
  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  const handleBotAction = () => {
    if (bot === "close") {
      botAction("open");
    } else if (bot === "open") {
      botAction("close");
    }
  };

  return (
    <div className="side-bar-wrapper">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <Logo where="" />
        <h1 style={{ fontSize: "24px", color: "#06141b" }}>
          {Utils.capitalized(user?.username || "")}
        </h1>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <div className="tutorial">
          App's Tutorial:{" "}
          <span>
            <HiMiniVideoCamera />
          </span>
        </div>
        <div className="bot-btn" onClick={handleBotAction}>
          Who is <i>Matthew</i>
          <span>
            <GrRobot />
          </span>
        </div>
      </div>
      <Navigation />
      <button className="log-out" onClick={handleLogout}>
        <RiLogoutBoxLine />
        Log out
      </button>
    </div>
  );
};

export default SideBar;
