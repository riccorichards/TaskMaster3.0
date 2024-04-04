import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/AuthStore";
import Navigation from "./Navigation";
import "./SideBar.scss";
import Logo from "../header/logo/Logo";
import Utils from "../../utils/Utils";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useTaskStore } from "../../store/TaskStore";
import { IoIosTimer } from "react-icons/io";
import { FC } from "react";
import gpt from "../../assets/chatGPT.jpg";

const SideBar: FC<{
  setIsOpenTimer: (v: boolean) => void;
  setIsOpenGPT: (v: boolean) => void;
}> = ({ setIsOpenTimer, setIsOpenGPT }) => {
  const { logOut, user, myStats } = useUserStore();
  const navigate = useNavigate();
  const { dailyResult } = useTaskStore();

  const handleLogout = () => {
    logOut();
    localStorage.setItem("valid-user", JSON.stringify(false));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  const quality =
    dailyResult &&
    dailyResult.reduce((acc, task) => acc + task.value, 0) / dailyResult.length;

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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            color: "#9baab8",
          }}
        >
          {user?.picture && (
            <img
              src={user?.picture}
              alt=""
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2.5px solid #06141b",
              }}
            />
          )}
          <h1
            style={{ fontSize: "24px", color: "#06141b", textAlign: "center" }}
          >
            {Utils.capitalized(user?.username || "")}
          </h1>
          <span style={{ fontSize: "14px" }}>
            Quality: {quality ? quality.toFixed(2) : 0}%
          </span>
          <span style={{ fontSize: "14px" }}>
            Per day: {myStats?.perDay?.toFixed(2)} hr
          </span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <div className="tutorial" onClick={() => setIsOpenGPT(true)}>
          <h3>AI helper</h3>
          <img
            src={gpt}
            alt="gpt-image"
            style={{
              width: "30px",
              height: "30px",
              objectFit: "cover",
              borderRadius: "3.5px",
              alignSelf: "flex-end",
            }}
          />
        </div>
        <div className="bot-btn" onClick={() => setIsOpenTimer(true)}>
          <h3>Run timer</h3>
          <span>
            <IoIosTimer />
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
