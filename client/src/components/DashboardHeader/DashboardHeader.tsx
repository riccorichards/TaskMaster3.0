import { useState } from "react";
import { useUserStore } from "../../store/AuthStore";
import Utils from "../../utils/Utils";
import Logo from "../header/logo/Logo";
import "./DashboardHeader.scss";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import OpenedProfile from "./OpenedProfile";
import { NavLink } from "react-router-dom";
import { TbHomeStats } from "react-icons/tb";
import { BiTask } from "react-icons/bi";
import { IoIosTimer } from "react-icons/io";
import { RiNodeTree } from "react-icons/ri";
import DisplayTimer from "../Timer/DisplayTimer";
const navlinkStyle = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
  padding: "5px",
  color: "inherit",
  textDecoration: "none",
};

const DashboardHeader = () => {
  const { user } = useUserStore();
  const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false);

  const handleOpenProfile = () => {
    setIsOpenProfile(!isOpenProfile);
  };

  return (
    <div className="dashboard-header">
      <Logo where="header" />
      <ul className="dashboard-header-navs">
        <NavLink style={navlinkStyle} to="/dashboard/workspace">
          <TbHomeStats />
          Overview
        </NavLink>
        <NavLink style={navlinkStyle} to="/dashboard/task-generator">
          <BiTask />
          Task
        </NavLink>
        <NavLink style={navlinkStyle} to="/dashboard/timer">
          <IoIosTimer />
          Timer
        </NavLink>
        <NavLink style={navlinkStyle} to="/dashboard/road-map">
          <RiNodeTree />
          Road Map
        </NavLink>
      </ul>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            position: "relative",
          }}
        >
          <h1 style={{ color: "#06141b" }}>
            {Utils.capitalized(user?.username || "")}
          </h1>
          {isOpenProfile ? (
            <FaChevronUp
              onClick={handleOpenProfile}
              style={{ fontSize: "14px", color: "#ccd0cf" }}
            />
          ) : (
            <FaChevronDown
              onClick={handleOpenProfile}
              style={{ fontSize: "14px", color: "#ccd0cf" }}
            />
          )}
          {isOpenProfile && <OpenedProfile />}
        </div>
        <div className="header-timer-wrapper">
          <DisplayTimer />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
