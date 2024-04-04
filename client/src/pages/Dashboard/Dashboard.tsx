import { useEffect, useState } from "react";
import { useUserStore } from "../../store/AuthStore";
import "./Dashboard.css";
import MainDashboard from "./MainDashboard/MainDashboard";
import SideBar from "../../components/SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import { useToolsStore } from "../../store/ToolsStore";
import ScreenSizeHandler from "../../utils/ScreenSizeHandler";
import Timer from "../../components/Timer/TimerSetup";
import Draggable from "../../components/Draggable";
import Gpt from "../../components/GPT/GPT";

const Dashboard = () => {
  const { getMe, user, session } = useUserStore();
  const navigate = useNavigate();
  const [authChecking, setAuthChecking] = useState(true);
  const { screenSize } = useToolsStore();
  const [isOpenTimer, setIsOpenTimer] = useState<boolean>(false);
  const [isOpenGPT, setIsOpenGPT] = useState<boolean>(false);

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
          <aside>
            {screenSize > 769 ? (
              <SideBar
                setIsOpenTimer={setIsOpenTimer}
                setIsOpenGPT={setIsOpenGPT}
              />
            ) : (
              <DashboardHeader setIsOpenTimer={setIsOpenTimer} />
            )}
          </aside>
          <main>
            <MainDashboard />
          </main>
        </div>
        {isOpenTimer && (
          <Draggable children={<Timer setIsOpenTimer={setIsOpenTimer} />} />
        )}
        {isOpenGPT && (
          <Draggable children={<Gpt setIsOpenGPT={setIsOpenGPT} />} />
        )}
      </section>
    </>
  );
};

export default Dashboard;
