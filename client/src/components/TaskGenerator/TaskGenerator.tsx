import { useEffect, useState } from "react";
import "./TaskGenerator.scss";
import WorkSpace from "./WorkSpace/WorkSpace";
import TasksWrapper from "../TasksWrapper/TasksWrapper";
import { useTaskStore } from "../../store/TaskStore";
import TaskInput from "./TaskInput/TaskInput";
import Utils from "../../utils/Utils";

const TaskGenerator = () => {
  const [storeWorkspace, setStoreWorkspace] = useState<string | null>(null);
  const { getTasks, dayFinish } = useTaskStore();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const handleDayFinish = () => {
    dayFinish();
    setTimeout(() => {
      Utils.scrollToComponent("Overview");
    }, 1000);
  };

  return (
    <section className="task-generator-wrapper" id="Task">
      <div className="task-generator">
        <WorkSpace setStoreWorkspace={setStoreWorkspace} />
        <TaskInput
          storeWorkspace={storeWorkspace}
          setStoreWorkspace={setStoreWorkspace}
        />
        <TasksWrapper />
        <button className="store-daily-result" onClick={handleDayFinish}>
          <span>Store result</span>
        </button>
      </div>
    </section>
  );
};

export default TaskGenerator;
