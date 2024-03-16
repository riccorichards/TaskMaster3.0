import { FC, useState } from "react";
import { useUserStore } from "../../store/AuthStore";

const Profile: FC<{
  handleScrollProcess: (v: string) => void;
  hasScrollDown: boolean;
}> = ({ handleScrollProcess, hasScrollDown }) => {
  const [isProfile, setIsProfle] = useState<boolean>(false);
  const { user } = useUserStore();
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        color: "orangered",
        position: "relative",
      }}
      onClick={() => setIsProfle(!isProfile)}
    >
      <span style={{ padding: "5px", color: "#1e6c82" }}>{user?.username}</span>
      {isProfile && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fff",
            padding: "5px",
          }}
        >
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
    </div>
  );
};

export default Profile;
