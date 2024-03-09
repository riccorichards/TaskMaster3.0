import AllActivities from "../AllActivities/AllActivities";
import MyStats from "../MyStats/MyStats";
import DailyResult from "./DailyResult";
import "./Overview.css";
import TopLearnedTopics from "./TopLearnedTopics";

const Overview = () => {
  return (
    <div className="overview-wrapper" id="Overview">
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
    </div>
  );
};

export default Overview;
