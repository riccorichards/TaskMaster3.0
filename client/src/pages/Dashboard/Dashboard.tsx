import { useEffect } from "react";
import Overview from "../../components/Overview/Overview";
import RoadMap from "../../components/RoadMap/RoadMap";
import TaskGenerator from "../../components/TaskGenerator/TaskGenerator";
import Timer from "../../components/Timer/TimerSetup";
import Footer from "../../components/footer/Footer";
import { useUserStore } from "../../store/AuthStore";
import "./Dashboard.scss";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";

const Dashboard = () => {
  const { getMe, user } = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    getMe();
  }, [getMe]);

  useEffect(() => {
    let timeOut: ReturnType<typeof setTimeout>;
    if (!user) {
      timeOut = setTimeout(() => {
        if (!user) {
          navigate("/auth");
        }
      }, 1500);
    }

    return () => clearTimeout(timeOut);
  }, [user, navigate]);

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
