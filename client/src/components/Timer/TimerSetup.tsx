import { useState } from "react";
import "./TimerSetup.scss";
import TimerControllers from "./TimerControllers";
import { useTaskStore } from "../../store/TaskStore";
import DefinedTask from "./DefinedTask";
import TaskNotChosen from "./TaskNotChosen";
import DisplayTimer from "./DisplayTimer";

const Timer = () => {
  const [taskIndex, setTaskIndex] = useState<number | null>(null);
  const { tasks } = useTaskStore();
  const handleTaskIndex = (ind: number) => {
    setTaskIndex(ind);
  };

  return (
    <section className="timer-wrapper">
      <div className="timer">
        <div className="timer-setup-wrapper">
          <div className="timer-setup">
            <div className="define-task">
              <span>You need to select task to define working hours</span>
              <div
                style={{
                  padding: "5px",
                  backgroundColor: "#11212d",
                  width: "fit-content",
                  borderRadius: "3.5px",
                }}
              >
                Select:
              </div>
              <div className="define-task-box">
                {tasks.map((task, i) => (
                  <button
                    className="task-picker"
                    key={i}
                    onClick={() => handleTaskIndex(i)}
                    disabled={task.complete}
                    style={{
                      cursor: task.complete ? "not-allowed" : "pointer",
                      backgroundColor: task.complete ? "#14bc87" : "",
                    }}
                  >
                    <h4>WorkSpace: {task.workspace}</h4>
                    <h4>Task: {task.task}</h4>
                  </button>
                ))}
              </div>
            </div>
            <div className="chosen-task-wrapper">
              {taskIndex === null ? (
                <TaskNotChosen />
              ) : (
                <DefinedTask taskIndex={taskIndex} />
              )}
            </div>
            <TimerControllers
              taskIndex={taskIndex}
              setTaskIndex={setTaskIndex}
            />
          </div>
        </div>
        <DisplayTimer />
      </div>
    </section>
  );
};

export default Timer;
