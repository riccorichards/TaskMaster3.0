import { useEffect } from "react";
import { useUserStore } from "../../store/AuthStore";
import { useNodeTree } from "../../store/NodeTreeStore";
import AllActivities from "../AllActivities/AllActivities";
import MyStats from "../MyStats/MyStats";
import DailyResult from "./DailyResult";
import "./Overview.css";
import TopLearnedTopics from "./TopLearnedTopics";
import PathForNewUser from "./PathForNewUser";
import { useTaskStore } from "../../store/TaskStore";

const Overview = () => {
  const { user } = useUserStore();
  const { fetchEntireNodesName, nodeNames } = useNodeTree();
  const { history } = useTaskStore();

  useEffect(() => {
    if (user) {
      fetchEntireNodesName(user.username);
    }
  }, [user, fetchEntireNodesName]);

  return (
    <div className="overview-wrapper">
      {history.length < 1 && (
        <p
          style={{
            padding: "5px",
            position: "absolute",
            top: "2.5%",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: " #06141b",
            color: "#ccd0cf",
            textAlign: "center",
            width: "calc(100% - 20px)",
            borderRadius: "3.5px",
            boxShadow: "0 0 1px #ccd0cf",
          }}
        >
          <span
            style={{
              padding: "2.5px",
              backgroundColor: "#11212d",
              color: "orangered",
              borderRadius: "2.5px",
            }}
          >
            Pro Tip:
          </span>{" "}
          To unlock insights into your learning progress and access other
          related data, make sure to log your tasks for at least one day!
        </p>
      )}
      {nodeNames.length < 1 ? (
        <PathForNewUser />
      ) : (
        <div className="overview">
          <div className="left-side-wrapper">
            <div className="daily-result-wrapper">
              <DailyResult />
            </div>
            <div className="active-history-wrapper">
              <AllActivities />
            </div>
          </div>
          <div className="right-side-wrapper">
            <div className="my-stats-wrapper">
              <MyStats />
            </div>
            <div className="top-learned-wrapper">
              <TopLearnedTopics />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
