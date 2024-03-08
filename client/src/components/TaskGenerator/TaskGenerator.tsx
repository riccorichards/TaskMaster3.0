import { useEffect, useRef, useState } from "react";
import "./TaskGenerator.scss";
import WorkSpace from "./WorkSpace/WorkSpace";
import TasksWrapper from "../TasksWrapper/TasksWrapper";

const TaskGenerator = () => {
  const [storeWorkspace, setStoreWorkspace] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (storeWorkspace && inputRef.current) {
      inputRef.current.focus();
    }
  }, [storeWorkspace]);

  return (
    <section className="task-generator-wrapper">
      <div className="task-generator">
        <WorkSpace setStoreWorkspace={setStoreWorkspace} />
        <div className="insert-daily-task">
          {storeWorkspace && (
            <div className="stored-workspace">{storeWorkspace}</div>
          )}
          <input
            ref={inputRef}
            type="text"
            placeholder="Task, description.../priority; (example) => Blockchain, this is example of blockchain/high"
          />
          <button>Add new task</button>
        </div>
        <TasksWrapper />
      </div>
    </section>
  );
};

export default TaskGenerator;
