import { useEffect } from "react";
import { useUserStore } from "../../store/AuthStore";
import { useNodeTree } from "../../store/NodeTreeStore";
import AllActivities from "../AllActivities/AllActivities";
import MyStats from "../MyStats/MyStats";
import DailyResult from "./DailyResult";
import "./Overview.css";
import TopLearnedTopics from "./TopLearnedTopics";
import { useNavigate } from "react-router-dom";
import { GiPathDistance } from "react-icons/gi";

const Overview = () => {
  const { user } = useUserStore();
  const { fetchEntireNodesName, nodeNames } = useNodeTree();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log({ user });
      fetchEntireNodesName(user.username);
    }
  }, [user, fetchEntireNodesName]);

  return (
    <div className="overview-wrapper">
      {nodeNames.length < 1 ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
            backgroundColor: "#ccd0cf",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          <GiPathDistance style={{ fontSize: "100px" }} />
          <p>Empower Your Journey: Personalize Your Path to Success.</p>
          <button
            onClick={() => navigate("/dashboard/road-map")}
            className="new-user-btn"
          >
            Create your path
          </button>
        </div>
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
