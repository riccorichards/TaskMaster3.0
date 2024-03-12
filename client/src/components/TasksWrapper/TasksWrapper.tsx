import TaskCard from "../TaskCard/TaskCard";
import "./TasksWrapper.css";
import { useTaskStore } from "../../store/TaskStore";

const TasksWrapper = () => {
  const { tasks } = useTaskStore();

  return (
    <div className="tasks-wrapper">
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskCard task={task} key={task._id} />)
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Task was not defined...
        </div>
      )}
    </div>
  );
};

export default TasksWrapper;
