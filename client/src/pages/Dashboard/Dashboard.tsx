import { useEffect, useState } from "react";
import { useUserStore } from "../../store/AuthStore";
import "./Dashboard.css";
import MainDashboard from "./MainDashboard/MainDashboard";
import SideBar from "../../components/SideBar/SideBar";
import Bot from "../../components/Bot/Bot";
import { useBotStore } from "../../store/BotStore";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";

const Dashboard = () => {
  const { getMe, user } = useUserStore();
  const { bot } = useBotStore();
  const navigate = useNavigate();
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize]);

  useEffect(() => {
    const checkUser = async () => {
      await getMe();
      setAuthChecking(false);
    };

    checkUser();
  }, [getMe]);

  useEffect(() => {
    if (!authChecking) {
      if (!user) {
        const isValidUser = JSON.parse(
          localStorage.getItem("valid-user") || "false"
        );
        if (!isValidUser) {
          navigate("/auth");
        }
      } else {
        localStorage.setItem("valid-user", JSON.stringify(true));
      }
    }
  }, [user, navigate, authChecking]);

  return (
    <section className="dashboard-wrapper">
      <div className="dashboard">
        <aside>{screenSize > 769 ? <SideBar /> : <DashboardHeader />}</aside>
        <main>
          <MainDashboard />
        </main>
      </div>
      {(bot === "open" || bot === "hide") && <Bot />}
    </section>
  );
};

export default Dashboard;
