import { useEffect } from "react";
import { useUserStore } from "../../store/AuthStore";
import "./Dashboard.css";
import MainDashboard from "./MainDashboard/MainDashboard";
import SideBar from "../../components/SideBar/SideBar";
import Bot from "../../components/Bot/Bot";
import { useBotStore } from "../../store/BotStore";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { getMe, user } = useUserStore();
  const { bot } = useBotStore();
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
      }, 15000);
    }

    return () => clearTimeout(timeOut);
  }, [user, navigate]);

  return (
    <section className="dashboard-wrapper">
      <div className="dashboard">
        <aside>
          <SideBar />
        </aside>
        <main>
          <MainDashboard />
        </main>
      </div>
      {(bot === "open" || bot === "hide") && <Bot />}
    </section>
  );
};

export default Dashboard;
