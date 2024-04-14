import { useEffect, useState } from "react";
import "./TaskGenerator.scss";
import WorkSpace from "./WorkSpace/WorkSpace";
import TasksWrapper from "../TasksWrapper/TasksWrapper";
import { useTaskStore } from "../../store/TaskStore";
import TaskInput from "./TaskInput/TaskInput";
import Utils from "../../utils/Utils";

const TaskGenerator = () => {
  const [storeWorkspace, setStoreWorkspace] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const { getTasks, dayFinish, tasks } = useTaskStore();
  const [errorHandler, setErrorHadler] = useState<string | null>(null);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const handleDayFinish = () => {
    if (tasks.length > 0) {
      dayFinish();
      setErrorHadler(null);
      setIsLoading(true);
    } else {
      setErrorHadler("Task is not existing...");
    }
  };

  useEffect(() => {
    if (tasks.length > 0) {
      setErrorHadler(null);
    }
  }, [tasks]);

  useEffect(() => {
    if (tasks.length === 0) {
      setIsLoading(null);
    }
  }, [tasks]);

  const totalHours =
    tasks.length > 0 && tasks.reduce((acc, task) => acc + task.storedTime, 0);

  return (
    <section className="task-generator">
      <WorkSpace setStoreWorkspace={setStoreWorkspace} />
      <TaskInput
        storeWorkspace={storeWorkspace}
        setStoreWorkspace={setStoreWorkspace}
      />
      <TasksWrapper />
      <button className="store-daily-result" onClick={handleDayFinish}>
        <span>
          {" "}
          <span style={{ color: "orangered" }}>
            {tasks.length > 0 && Utils.formatDuration(totalHours || 0)}
          </span>{" "}
          {`Store result ${isLoading ? "..." : ""}`}
        </span>
      </button>
      {errorHandler && (
        <p style={{ fontSize: "14px", color: "red", alignSelf: "flex-end" }}>
          {errorHandler}
        </p>
      )}
    </section>
  );
};

export default TaskGenerator;
