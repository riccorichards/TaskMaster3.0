import { FC } from "react";
import { useTaskStore } from "../../store/TaskStore";

const DefinedTask: FC<{ taskIndex: number }> = ({ taskIndex }) => {
  const { tasks } = useTaskStore();
  return (
    <div className="defined-task-wrapper">
      <h3>WorkSpace: {tasks[taskIndex].workspace}</h3>
      <p>
        Task: <span>{tasks[taskIndex].task}</span>
      </p>
      <p>
        Description:{" "}
        <span>
          {tasks[taskIndex].desc.length > 25
            ? tasks[taskIndex].desc.slice(0, 25) + "..."
            : tasks[taskIndex].desc}
        </span>
      </p>
      <p>
        Stored Timer: <span>{tasks[taskIndex].storedTime}</span>
      </p>
      <p>
        Priority:{" "}
        <span
          style={{
            backgroundColor:
              tasks[taskIndex].priority === "high"
                ? "#85170e"
                : tasks[taskIndex].priority === "medium"
                ? "#dbba25"
                : "#4efb94",
            padding: "2.5px",
            color: "#fff",
            borderRadius: "2.5px",
          }}
        >
          {tasks[taskIndex].priority}
        </span>
      </p>
    </div>
  );
};

export default DefinedTask;
