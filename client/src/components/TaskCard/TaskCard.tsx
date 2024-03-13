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
        Workspace:{" "}
        <span
          style={{
            backgroundColor: "#14bc87",
            padding: "3.5px",
            borderRadius: "3.5px",
          }}
        >
          {task.workspace}
        </span>
      </h4>
      <p>
        Task:{" "}
        <span
          style={{
            backgroundColor: "orangered",
            padding: "3.5px",
            borderRadius: "3.5px",
          }}
        >
          {task.task}
        </span>
      </p>
      <p>
        Stored Time:{" "}
        <span
          style={{
            backgroundColor: "#fb2985",
            padding: "3.5px",
            borderRadius: "3.5px",
          }}
        >
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
      <span
        style={{
          position: "absolute",
          bottom: "0",
          left: "5px",
          padding: "1.5px",
          backgroundColor: "#fff",
          color: "orangered",
          borderRadius: "2.5px",
          fontWeight: "bold",
          fontSize: "14px",
        }}
      >
        {Utils.extractDate(task.createdAt)}
      </span>
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
