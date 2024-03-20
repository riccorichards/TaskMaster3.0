import { NavLink } from "react-router-dom";
import { TbHomeStats } from "react-icons/tb";
import { BiTask } from "react-icons/bi";
import { IoIosTimer } from "react-icons/io";
import { RiNodeTree } from "react-icons/ri";

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
      <NavLink className="nav-item" to="/dashboard/timer">
        <IoIosTimer />
        Timer
      </NavLink>
      <NavLink className="nav-item" to="/dashboard/road-map">
        <RiNodeTree />
        Road Map
      </NavLink>
    </ul>
  );
};

export default Navigation;
