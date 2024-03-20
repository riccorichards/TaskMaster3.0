import TaskCard from "../TaskCard/TaskCard";
import "./TasksWrapper.css";
import { useTaskStore } from "../../store/TaskStore";
import { BsDatabaseExclamation } from "react-icons/bs";

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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "fit-content",
              flexDirection: "column",
              padding: "15px",
              borderRadius: "5px",
              backgroundColor: "#ccd0cf",
              margin: "0 auto",
              gap: "10px",
            }}
          >
            <BsDatabaseExclamation />
            <span>Task was not found!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksWrapper;
