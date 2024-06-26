import React, { FC, useEffect, useRef, useState } from "react";
import "./TaskInput.scss";
import { IoCloseCircle } from "react-icons/io5";
import { useTaskStore } from "../../../store/TaskStore";
import Utils from "../../../utils/Utils";

const TaskInput: FC<{
  storeWorkspace: string | null;
  setStoreWorkspace: (v: null) => void;
}> = ({ storeWorkspace, setStoreWorkspace }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [errorhandler, setErrorHandler] = useState<string | null>(null);
  const { createTask } = useTaskStore();
  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {
    if (storeWorkspace && inputRef.current) {
      inputRef.current.focus();
    }
  }, [storeWorkspace]);

  const handleCreateTask = () => {
    if (!storeWorkspace) {
      setErrorHandler("You need to define the workspace!");
      return;
    }
    if (inputValue !== "") {
      const task = inputValue.split(",")[0].split("/")[0].trim();
      const desc = inputValue.split(",")[1].split("/")[0].trim();
      const priority = inputValue.split("/")[1].trim();
      const allowedPriorities = ["easy", "medium", "high"];

      if (!allowedPriorities.includes(priority)) {
        setErrorHandler("Priority should be one of them (easy/medium/high)");
        return;
      }

      setErrorHandler(null);
      const newTask = {
        workspace: storeWorkspace,
        task: Utils.capitalized(task),
        desc: Utils.capitalized(desc),
        priority,
        storedTime: 0,
        complete: false,
      };

      createTask(newTask);
      setInputValue("");
      setStoreWorkspace(null);
    }
  };

  const handlekeyBoard = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCreateTask();
    }
  };
  return (
    <div className="insert-daily-task">
      {storeWorkspace && (
        <div className="stored-workspace">
          <IoCloseCircle
            onClick={() => setStoreWorkspace(null)}
            style={{ cursor: "pointer" }}
          />
          <span>{storeWorkspace}</span>
        </div>
      )}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onKeyDown={handlekeyBoard}
        onChange={handleInputValue}
        placeholder="Task, description.../priority; (example) => Blockchain, this is example of blockchain/high"
      />
      <button className="add-task-btn" onClick={handleCreateTask}>
        Add task
      </button>
      {errorhandler && (
        <p
          style={{
            color: "red",
            fontSize: "14px",
            position: "absolute",
            top: "100%",
            right: "0",
          }}
        >
          {errorhandler}
        </p>
      )}
    </div>
  );
};

export default TaskInput;
