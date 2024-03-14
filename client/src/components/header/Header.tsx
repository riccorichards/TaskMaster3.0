import "./Header.scss";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Utils from "../../utils/Utils";
import { useUserStore } from "../../store/AuthStore";
import { useTaskStore } from "../../store/TaskStore";
import Logo from "./logo/Logo";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const { user, myStats, logOut } = useUserStore();
  const { dailyResult } = useTaskStore();
  const [hasScrollDown, setHasScrollDown] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollVH = window.innerHeight * 0.1;

      if (window.scrollY >= scrollVH) {
        setHasScrollDown(true);
      } else {
        setHasScrollDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrollDown]);

  const handleScrollProcess = (id: string) => {
    Utils.scrollToComponent(id);
  };

  const quality =
    dailyResult &&
    dailyResult.reduce((acc, task) => acc + task.value, 0) / dailyResult.length;

  const handleLogout = () => {
    logOut();
  };

  const navigateToAuth = () => {
    navigate("/auth");
  };
  return (
    <header
      style={{
        backgroundColor: hasScrollDown ? "#14bc87" : "",
        transition: "all 0.25s ease-in-out",
      }}
    >
      <Logo hasScrollDown={hasScrollDown} />
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <h4>{user.username}</h4>
              <span style={{ fontSize: "14px" }}>
                Quality: {quality.toFixed(2)}%
              </span>
              <span style={{ fontSize: "14px" }}>
                Per day: {myStats?.perDay?.toFixed(2)} hr
              </span>
              <button className="log-out" onClick={handleLogout}>
                Log out
              </button>
            </div>
          </div>
          <ul>
            <li
              onClick={() => handleScrollProcess("Overview")}
              style={{
                transition: "all 0.25s ease-in-out",
                color: hasScrollDown ? "orangered" : "",
              }}
            >
              Overview
            </li>
            <li
              onClick={() => handleScrollProcess("Task")}
              style={{
                transition: "all 0.25s ease-in-out",
                color: hasScrollDown ? "orangered" : "",
              }}
            >
              Task
            </li>
            <li
              onClick={() => handleScrollProcess("Timer")}
              style={{
                transition: "all 0.25s ease-in-out",
                color: hasScrollDown ? "orangered" : "",
              }}
            >
              Timer
            </li>
            <li
              onClick={() => handleScrollProcess("Road Map")}
              style={{
                transition: "all 0.25s ease-in-out",
                color: hasScrollDown ? "orangered" : "",
              }}
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
