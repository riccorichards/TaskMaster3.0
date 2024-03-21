import { Route, Routes } from "react-router-dom";
import RoadMap from "../../../components/RoadMap/RoadMap";
import TaskGenerator from "../../../components/TaskGenerator/TaskGenerator";
import Overview from "../../../components/Overview/Overview";
import ChatWithBots from "../../../components/ChatWithBots/ChatWithBots";

const MainDashboard = () => {
  return (
    <Routes>
      <Route path="/overview" element={<Overview />} />
      <Route path="/task-generator" element={<TaskGenerator />} />
      <Route path="/road-map" element={<RoadMap />} />
      <Route path="/bots" element={<ChatWithBots />} />
    </Routes>
  );
};

export default MainDashboard;
