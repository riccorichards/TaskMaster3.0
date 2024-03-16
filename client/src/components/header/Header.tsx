import "./Header.scss";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Utils from "../../utils/Utils";
import { useUserStore } from "../../store/AuthStore";
import { useTaskStore } from "../../store/TaskStore";
import Logo from "./logo/Logo";
import { useEffect, useState } from "react";
import Profile from "./Profile";

const Header = () => {
  const navigate = useNavigate();
  const { user, myStats, logOut } = useUserStore();
  const { dailyResult } = useTaskStore();
  const [hasScrollDown, setHasScrollDown] = useState<boolean>(false);
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth);

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

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize]);

  const handleScrollProcess = (id: string) => {
    Utils.scrollToComponent(id);
  };

  const quality =
    dailyResult &&
    dailyResult.reduce((acc, task) => acc + task.value, 0) / dailyResult.length;

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  const navigateToAuth = () => {
    navigate("/auth");
  };

  return (
    <header
      style={{
        backdropFilter: user && hasScrollDown ? "blur(5px)" : "none",
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
          {screenSize < 425 ? (
            <Profile
              hasScrollDown={hasScrollDown}
              handleScrollProcess={handleScrollProcess}
            />
          ) : (
            <>
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
                    Quality: {quality ? quality.toFixed(2) : 0}%
                  </span>
                  <span style={{ fontSize: "14px" }}>
                    Per day: {myStats?.perDay?.toFixed(2)} hr
                  </span>
                  <button className="log-out" onClick={handleLogout}>
                    Log out
                  </button>
                </div>
              </div>
              {screenSize > 425 && (
                <ul>
                  <li
                    onClick={() => handleScrollProcess("Overview")}
                    style={{
                      transition: "all 0.25s ease-in-out",
                      color: hasScrollDown ? "#093b1f" : "",
                    }}
                  >
                    Overview
                  </li>
                  <li
                    onClick={() => handleScrollProcess("Task")}
                    style={{
                      transition: "all 0.25s ease-in-out",
                      color: hasScrollDown ? "#093b1f" : "",
                    }}
                  >
                    Task
                  </li>
                  <li
                    onClick={() => handleScrollProcess("Timer")}
                    style={{
                      transition: "all 0.25s ease-in-out",
                      color: hasScrollDown ? "#093b1f" : "",
                    }}
                  >
                    Timer
                  </li>
                  <li
                    onClick={() => handleScrollProcess("Road Map")}
                    style={{
                      transition: "all 0.25s ease-in-out",
                      color: hasScrollDown ? "#093b1f" : "",
                    }}
                  >
                    Road Map
                  </li>
                </ul>
              )}
            </>
          )}
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
