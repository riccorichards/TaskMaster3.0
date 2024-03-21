import { NavLink } from "react-router-dom";
import { TbHomeStats } from "react-icons/tb";
import { BiTask } from "react-icons/bi";
import { RiNodeTree } from "react-icons/ri";
import { SiProbot } from "react-icons/si";

const Navigation = () => {
  return (
    <ul className="navigation-wrapper">
      <NavLink className="nav-item" to="/dashboard/overview">
        <TbHomeStats />
        Overview
      </NavLink>
      <NavLink className="nav-item" to="/dashboard/task-generator">
        <BiTask />
        Task
      </NavLink>
      <NavLink className="nav-item" to="/dashboard/road-map">
        <RiNodeTree />
        Road Map
      </NavLink>
      <NavLink className="nav-item" to="/dashboard/bots">
        <SiProbot />
        Bots
      </NavLink>
    </ul>
  );
};

export default Navigation;
