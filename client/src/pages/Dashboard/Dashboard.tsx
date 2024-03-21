import { useEffect, useState } from "react";
import { useUserStore } from "../../store/AuthStore";
import "./Dashboard.css";
import MainDashboard from "./MainDashboard/MainDashboard";
import SideBar from "../../components/SideBar/SideBar";
import Bot from "../../components/Bot/Bot";
import { useBotStore } from "../../store/BotStore";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import { useToolsStore } from "../../store/ToolsStore";
import ScreenSizeHandler from "../../utils/ScreenSizeHandler";

const Dashboard = () => {
  const { getMe, user, session } = useUserStore();
  const { bot } = useBotStore();
  const navigate = useNavigate();
  const [authChecking, setAuthChecking] = useState(true);
  const { screenSize } = useToolsStore();

  useEffect(() => {
    const checkUser = async () => {
      await getMe();
      setAuthChecking(false);
    };

    checkUser();
  }, [getMe, session]);

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
    <>
      <ScreenSizeHandler />
      <section className="dashboard-wrapper">
        <div className="dashboard">
          <aside>{screenSize > 769 ? <SideBar /> : <DashboardHeader />}</aside>
          <main>
            <MainDashboard />
          </main>
        </div>
        {(bot === "open" || bot === "hide") && <Bot />}
      </section>
    </>
  );
};

export default Dashboard;
