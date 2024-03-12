import { useEffect } from "react";
import Overview from "../../components/Overview/Overview";
import RoadMap from "../../components/RoadMap/RoadMap";
import TaskGenerator from "../../components/TaskGenerator/TaskGenerator";
import Timer from "../../components/Timer/TimerSetup";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { useUserStore } from "../../store/AuthStore";
import "./Dashboard.scss";

const Dashboard = () => {
  const { getMe } = useUserStore();
  useEffect(() => {
    getMe();
  }, [getMe]);

  return (
    <div className="dashboard-wrapper">
      <Header />
      <section className="dashboard">
        <Overview />
        <TaskGenerator />
        <Timer />
        <RoadMap />
        <Footer />
      </section>
    </div>
  );
};

export default Dashboard;
