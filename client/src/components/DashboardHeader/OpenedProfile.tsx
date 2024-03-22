import { NavLink, useNavigate } from "react-router-dom";
import { useTaskStore } from "../../store/TaskStore";
import { useUserStore } from "../../store/AuthStore";
import { RiLogoutBoxLine, RiNodeTree } from "react-icons/ri";
import { HiMiniVideoCamera } from "react-icons/hi2";
import { TbHomeStats } from "react-icons/tb";
import { BiTask } from "react-icons/bi";
import { IoIosTimer } from "react-icons/io";
import { SiProbot } from "react-icons/si";
import { FC } from "react";

const navlinkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
  padding: "5px",
  color: "inherit",
  textDecoration: "none",
};

const OpenedProfile: FC<{ setIsOpenTimer: (v: boolean) => void }> = ({
  setIsOpenTimer,
}) => {
  const { dailyResult } = useTaskStore();
  const navigate = useNavigate();
  const { myStats, logOut } = useUserStore();

  const quality =
    dailyResult &&
    dailyResult.reduce((acc, task) => acc + task.value, 0) / dailyResult.length;

  const handleLogout = () => {
    logOut();
    navigate("/");
  };
  return (
    <div
      style={{
        zIndex: "1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "#9baab8",
        backgroundColor: "#06141b",
        padding: "10px 5px",
        position: "absolute",
        gap: "5px",
        top: "100%",
        right: "0",
        borderRadius: "15px 0 15px 15px",
        width: "200px",
        boxShadow: "0 0 1px #9baab8",
      }}
    >
      <span style={{ fontSize: "14px" }}>
        Quality: {quality ? quality.toFixed(2) : 0}%
      </span>
      <span style={{ fontSize: "14px" }}>
        Per day: {myStats?.perDay?.toFixed(2)} hr
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <span
          style={{
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            border: "1px solid",
          }}
        >
          <HiMiniVideoCamera />
        </span>
        <span
          style={{
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            border: "1px solid",
          }}
        >
          <IoIosTimer onClick={() => setIsOpenTimer(true)} />
        </span>
      </div>
      <div
        style={{ width: "100%", height: "1px", backgroundColor: "#9baab8" }}
      />
      <NavLink style={navlinkStyle} to="/dashboard/overview">
        <TbHomeStats />
        Overview
      </NavLink>
      <NavLink style={navlinkStyle} to="/dashboard/task-generator">
        <BiTask />
        Task
      </NavLink>
      <NavLink style={navlinkStyle} to="/dashboard/bots">
        <SiProbot />
        Bots
      </NavLink>
      <NavLink style={navlinkStyle} to="/dashboard/road-map">
        <RiNodeTree />
        Road Map
      </NavLink>
      <div
        style={{ width: "100%", height: "1px", backgroundColor: "#9baab8" }}
      />
      <button className="log-out" onClick={handleLogout}>
        <RiLogoutBoxLine />
        Log out
      </button>
    </div>
  );
};

export default OpenedProfile;
