import { FC } from "react";
import "./TaskCard.scss";
import { TaskType } from "../../types";

const TaskCard: FC<{ task: TaskType }> = ({ task }) => {
  return (
    <div className="single-task">
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
            backgroundColor: "#f07043",
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
          {task.storedTime}
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
					justifyContent: "space-evenly",
					padding: "5px",
					backgroundColor: "#fff",
					borderRadius:"3.5px"
        }}
      >
        <button className="update-btn">Update</button>
        <button className="remove-btn">Remove</button>
      </div>
    </div>
  );
};

export default TaskCard;
