import "./Header.scss";
import { RiTimerFlashFill } from "react-icons/ri";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Utils from "../../utils/Utils";
import { useUserStore } from "../../store/AuthStore";
import { IoPersonCircleSharp } from "react-icons/io5";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const navigateToAuth = () => {
    navigate("/auth");
  };
  const handleScrollProcess = (id: string) => {
    Utils.scrollToComponent(id);
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
              {user.url ? (
                <img src={user.url} alt={user.username} />
              ) : (
                <IoPersonCircleSharp style={{ fontSize: "50px" }} />
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h4>{user.username}</h4>
              <span style={{ fontSize: "14px" }}>Quality: 50%</span>
              <span style={{ fontSize: "14px" }}>Per day: 10.32 hr</span>
            </div>
          </div>
          <ul>
            <li onClick={() => handleScrollProcess("Overview")}>Overview</li>
            <li onClick={() => handleScrollProcess("Task")}>Task</li>
            <li onClick={() => handleScrollProcess("Timer")}>Timer</li>
            <li onClick={() => handleScrollProcess("Road Map")}>Road Map</li>
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
