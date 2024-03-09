import "./Header.scss";
import { RiTimerFlashFill } from "react-icons/ri";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Utils from "../../utils/Utils";
import { useState } from "react";

const takeUser = {
  image:
    "https://i.pinimg.com/564x/0d/73/2a/0d732a2d47466ce73d95fe8c4acfd315.jpg",
  username: "Anastasia",
};

const Header = () => {
  const [currentLocation, setCurrentLocation] = useState<string>("Overview");
  const navigate = useNavigate();
  const user = true;
  const navigateToAuth = () => {
    navigate("/auth");
  };

  const handleScrollProcess = (id: string) => {
    Utils.scrollToComponent(id);
    setCurrentLocation(id);
  };
  return (
    <header>
      <div className="logo-wrapper">
        <RiTimerFlashFill />
        <p>Time for us</p>
      </div>
      {user ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "25px",
            flexDirection: "row-reverse",
          }}
        >
          <div className="profile-wrapper">
            <div className="profile-img">
              <img src={takeUser.image} alt={takeUser.username} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h4>{takeUser.username}</h4>
              <span style={{ fontSize: "14px" }}>Quality: 50%</span>
              <span style={{ fontSize: "14px" }}>Per day: 10.32 hr</span>
            </div>
          </div>
          <ul>
            <li
              onClick={() => handleScrollProcess("Overview")}
              style={{ color: currentLocation === "Overview" ? "#fff" : "" }}
            >
              Overview
            </li>
            <li
              onClick={() => handleScrollProcess("Task")}
              style={{ color: currentLocation === "Task" ? "#fff" : "" }}
            >
              Task
            </li>
            <li
              onClick={() => handleScrollProcess("Timer")}
              style={{ color: currentLocation === "Timer" ? "#fff" : "" }}
            >
              Timer
            </li>
            <li
              onClick={() => handleScrollProcess("Road Map")}
              style={{ color: currentLocation === "Road Map" ? "#fff" : "" }}
            >
              Road Map
            </li>
          </ul>
        </div>
      ) : (
        <button onClick={navigateToAuth}>
          <span>Sign up</span>
          <FaSignInAlt />
        </button>
      )}
    </header>
  );
};

export default Header;
