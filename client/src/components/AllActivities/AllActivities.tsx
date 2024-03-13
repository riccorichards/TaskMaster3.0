import { useEffect } from "react";
import "./AllActivities.css";
import { useTaskStore } from "../../store/TaskStore";
import Utils from "../../utils/Utils";
import FilterController from "./FilterController";

const AllActivities = () => {
  const { history, getHistory } = useTaskStore();

  useEffect(() => {
    getHistory("10");
  }, [getHistory]);

  const historyLen = history.length;
  return (
    <div className="all-activities-wapper">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3>Recently activities</h3>
        <FilterController historyLen={historyLen} />
      </div>
      <div className="all-acts-header">
        <span className="act-header-item">
          <b>#Workspace</b>
        </span>
        <span className="act-header-item">
          <b>#Complete</b>
        </span>
        <span className="act-header-item">
          <b>#Duration</b>
        </span>
        <span className="act-header-item">
          <b>#Priority</b>
        </span>
        <span className="act-header-item">
          <b>#CreatedAt</b>
        </span>
      </div>
      <div className="active-wrapper">
        {history &&
          history.map((active, i) => (
            <div className="single-active" key={i}>
              <span>{active.workspace}</span>
              <span
                style={{
                  color: "#fff",
                  padding: "2.5px",
                  borderRadius: "2.5px",
                  backgroundColor: active.complete ? "#01c380" : "#fb2985",
                }}
              >
                {active.complete ? "True" : "Failed"}
              </span>
              <span>{Utils.formatDuration(active.storedTime)}</span>
              <span
                style={{
                  backgroundColor:
                    active.priority === "high"
                      ? "#85170e"
                      : active.priority === "medium"
                      ? "#dbba25"
                      : "#4efb94",
                  padding: "2.5px",
                  color: "#fff",
                  borderRadius: "2.5px",
                }}
              >
                {active.priority}
              </span>
              <span>{Utils.extractDate(active.createdAt)}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllActivities;
