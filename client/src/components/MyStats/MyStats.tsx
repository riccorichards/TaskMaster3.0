import "./MyStats.css";

const MyStats = () => {
  const randomWidth = Math.floor(Math.random() * 100);
  const ot = Math.floor(Math.random() * 100);
  return (
    <div className="my-stats">
      <h3>Welcome to your journey!</h3>
      <div className="submit-journey-info">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              padding: "3.5px",
              backgroundColor: "#f07043",
              borderRadius: "3.5px",
              color: "#fff",
            }}
          >
            Journey duration
          </span>
          <input type="text" placeholder="Format (2024-03-09)" />
        </div>
        <span style={{ fontSize: "12px" }}>
          Valid duration is this format 2024-03-09
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              padding: "3.5px",
              backgroundColor: "#fb2985",
              borderRadius: "3.5px",
              color: "#fff",
            }}
          >
            Allocated time
          </span>
          <input type="text" placeholder="Format 150" />
        </div>
        <button className="submit-journey-btn">New journey</button>
      </div>
      <div className="journey-stats">
        <div>
          <span style={{ fontSize: "14px" }}>Remain days</span>
          <div className="custom-chart">
            <div
              style={{
                position: "absolute",
                height: "100%",
                backgroundColor: "#f07043",
                width: `${randomWidth}%`,
              }}
            />
          </div>
        </div>
        <div>
          <span style={{ fontSize: "14px" }}>Remain hours</span>
          <div className="custom-chart">
            <div
              style={{
                position: "absolute",
                height: "100%",
                backgroundColor: " #fb2985",
                width: `${ot}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStats;
