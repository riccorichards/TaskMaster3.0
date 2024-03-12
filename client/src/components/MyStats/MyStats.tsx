import "./MyStats.css";
import StatsInput from "./StatsInput";

const MyStats = () => {
  const randomWidth = Math.floor(Math.random() * 100);
  const ot = Math.floor(Math.random() * 100);

  return (
    <div className="my-stats">
      <h3>Welcome to your journey!</h3>
      <StatsInput />
      <div className="journey-stats">
        <div>
          <span style={{ fontSize: "14px" }}>Remain days</span>
          <div className="custom-chart">
            <div
              style={{
                position: "absolute",
                height: "100%",
                backgroundColor: "orangered",
                width: `${randomWidth}%`,
              }}
            />
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              {randomWidth}%
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
                backgroundColor: " #fb2985",
                width: `${ot}%`,
              }}
            />
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
              }}
            >
              {ot}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStats;
