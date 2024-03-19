import { useEffect } from "react";
import "./AllActivities.css";
import { useTaskStore } from "../../store/TaskStore";
import Utils from "../../utils/Utils";
import FilterController from "./FilterController";
import { useUserStore } from "../../store/AuthStore";

const AllActivities = () => {
  const { history, getHistory } = useTaskStore();
  const { user } = useUserStore();

  useEffect(() => {
    if (user) {
      getHistory("10");
    }
  }, [user, getHistory]);

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
        <h3>Activities</h3>
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
              <span>{active.complete ? "True" : "Failed"}</span>
              <span>{Utils.formatDuration(active.storedTime)}</span>
              <span>{active.priority}</span>
              <span>{Utils.extractDate(active.createdAt)}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllActivities;
