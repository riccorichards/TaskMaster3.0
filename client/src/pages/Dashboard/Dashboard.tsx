import RoadMap from "../../components/RoadMap/RoadMap";
import TaskGenerator from "../../components/TaskGenerator/TaskGenerator";
import Timer from "../../components/Timer/TimerSetup";
import Header from "../../components/header/Header";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <Header />
      <section className="dashboard">
        <TaskGenerator />
        <Timer />
        <RoadMap />
      </section>
    </div>
  );
};

export default Dashboard;
