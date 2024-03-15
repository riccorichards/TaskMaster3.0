import React, { useEffect } from "react";
const Overview = React.lazy(() => import("../../components/Overview/Overview"));
const RoadMap = React.lazy(() => import("../../components/RoadMap/RoadMap"));
const TaskGenerator = React.lazy(
  () => import("../../components/TaskGenerator/TaskGenerator")
);

import Timer from "../../components/Timer/TimerSetup";
import Footer from "../../components/footer/Footer";
import { useUserStore } from "../../store/AuthStore";
import "./Dashboard.scss";
import Header from "../../components/header/Header";

const Dashboard = () => {
  const { getMe } = useUserStore();
  useEffect(() => {
    getMe();
  }, [getMe]);

  return (
    <section className="dashboard">
      <div style={{ height: "10vh" }}>
        <Header />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "160px" }}>
        <Overview />
        <TaskGenerator />
        <Timer />
        <RoadMap />
        <Footer />
      </div>
    </section>
  );
};

export default Dashboard;
