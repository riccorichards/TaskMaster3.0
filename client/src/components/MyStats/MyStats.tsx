import { useEffect } from "react";
import { useUserStore } from "../../store/AuthStore";
import Loader from "../Loader/Loader";
import "./MyStats.css";
import StatsInput from "./StatsInput";

const MyStats = () => {
  const { myStats, getMyStats, user, isLoading } = useUserStore();
  useEffect(() => {
    if (user) {
      getMyStats();
    }
  }, [user, getMyStats]);

  if (isLoading) return <Loader />;
  if (!myStats) return null;

  return (
    <div className="my-stats">
      <h3>Welcome to your journey!</h3>
      <StatsInput />
      <div className="journey-stats">
        <div>
          <span style={{ fontSize: "14px" }}>Remaining days</span>
          <div className="custom-chart">
            <div
              style={{
                position: "absolute",
                height: "100%",
                backgroundColor: "#253745",
                borderRadius: "3.5px",
                width: `${myStats?.remainingDays}%`,
              }}
            />
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                color: myStats.remainingDays > 45 ? "#fff" : "",
              }}
            >
              {myStats?.remainingDays}%
            </span>
          </div>
        </div>
        <div>
          <span style={{ fontSize: "14px" }}>Used hours</span>
          <div className="custom-chart">
            <div
              style={{
                position: "absolute",
                height: "100%",
                backgroundColor: " #253745",
                width: `${myStats.usedTime}%`,
                borderRadius: "3.5px",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                color: myStats.usedTime > 45 ? "#fff" : "",
                transform: "translate(-50%,-50%)",
              }}
            >
              {myStats.usedTime?.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStats;
