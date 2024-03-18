import { useEffect } from "react";
import { useUserStore } from "../../store/AuthStore";
import "./Dashboard.css";
import MainDashboard from "./MainDashboard/MainDashboard";
import SideBar from "../../components/SideBar/SideBar";
import Bot from "../../components/Bot/Bot";
import { useBotStore } from "../../store/BotStore";

const Dashboard = () => {
  const { getMe } = useUserStore();
  const { bot } = useBotStore();
  useEffect(() => {
    getMe();
  }, [getMe]);

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
