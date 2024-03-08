import "./Header.scss";
import { RiTimerFlashFill } from "react-icons/ri";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const takeUser = {
  image:
    "https://i.pinimg.com/564x/0d/73/2a/0d732a2d47466ce73d95fe8c4acfd315.jpg",
  username: "Anastasia",
};
const Header = () => {
  const navigate = useNavigate();
  const user = true;
  const navigateToAuth = () => {
    navigate("/auth");
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
            <div>
              <h2>{takeUser.username}</h2>
              <span style={{ fontSize: "14px" }}>Quality: 50%</span>
            </div>
          </div>
          <ul>
            <li>Overview</li>
            <li>Task</li>
            <li>Timer</li>
            <li>Road Map</li>
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
