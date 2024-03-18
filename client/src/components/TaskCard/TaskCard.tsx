import { FC } from "react";
import "./TaskCard.scss";
import { TaskType } from "../../types";
import { useTaskStore } from "../../store/TaskStore";
import Utils from "../../utils/Utils";

const TaskCard: FC<{ task: TaskType }> = ({ task }) => {
  const { deleteTask } = useTaskStore();

  const handleRemoveTask = (taskId: string) => {
    deleteTask(taskId);
  };

  return (
    <div
      className="single-task"
      style={{ opacity: task.complete ? "0.5" : "1" }}
    >
      <h4>
        Workspace: <span>{task.workspace}</span>
      </h4>
      <p>
        Task: <span>{task.task}</span>
      </p>
      <p>
        Stored Time:{" "}
        <span>
          {task.storedTime === 0
            ? "N/A"
            : Utils.formatDuration(task.storedTime)}
        </span>
      </p>
      <p>
        Priority:{" "}
        <span
          style={{
            backgroundColor:
              task.priority === "high"
                ? "#85170e"
                : task.priority === "medium"
                ? "#dbba25"
                : "#4efb94",
            padding: "2.5px",
            color: "#fff",
            borderRadius: "2.5px",
          }}
        >
          {task.priority}
        </span>
      </p>
      <span className="task-created-at">{Utils.extractDate(task.createdAt || "")}</span>
      <button
        className="remove-btn"
        onClick={() => handleRemoveTask(task._id || "")}
        disabled={task.complete}
      >
        Remove
      </button>
    </div>
  );
};

export default TaskCard;
