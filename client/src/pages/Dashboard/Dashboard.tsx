import React, { useEffect, Suspense } from "react";
const Overview = React.lazy(() => import("../../components/Overview/Overview"));
const RoadMap = React.lazy(() => import("../../components/RoadMap/RoadMap"));
const TaskGenerator = React.lazy(
  () => import("../../components/TaskGenerator/TaskGenerator")
);

import Timer from "../../components/Timer/TimerSetup";
import Footer from "../../components/footer/Footer";
import { useUserStore } from "../../store/AuthStore";
import "./Dashboard.css";
import Header from "../../components/header/Header";
import Loader from "../../components/Loader/Loader";

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "160px",
          height: "100%",
        }}
      >
        <Suspense fallback={<Loader />}>
          <Overview />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <TaskGenerator />
        </Suspense>
        <Timer />
        <Suspense fallback={<Loader />}>
          <RoadMap />
        </Suspense>
        <Footer />
      </div>
    </section>
  );
};

export default Dashboard;
