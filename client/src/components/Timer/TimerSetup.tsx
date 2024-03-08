import { useState } from "react";
import "./TimerSetup.scss";
import { BsDatabaseExclamation } from "react-icons/bs";
import RunTimer from "./RunTimer";

const takeTasks = [
  {
    workSpace: "Data Structure",
    task: "hash tables",
    desc: "Practical: two challenge",
    storedTime: "begin",
    existing: "new",
    priority: "high",
  },
  {
    workSpace: "Blockchain",
    task: "Smart contract",
    desc: "Theory: fundamental",
    storedTime: "begin",
    existing: "new",
    priority: "easy",
  },
  {
    workSpace: "Data Structure",
    task: "heap",
    desc: "Practical: two challenge",
    storedTime: "begin",
    existing: "new",
    priority: "medium",
  },
];

const Timer = () => {
  const [isOpenTasks, setIsOpenedTasks] = useState<boolean>(false);
  const [taskIndex, setTaskIndex] = useState<number | null>(null);

  const handleTaskIndex = (ind: number) => {
    setTaskIndex(ind);
    setTimeout(() => {
      setIsOpenedTasks(false);
    }, 1500);
  };

  return (
    <section className="timer-wrapper">
      <div className="timer">
        <div className="timer-setup">
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <div className="define-task">
              <span>You need to select task to define working hours</span>
              <button
                className="define-task-btn"
                onClick={() => setIsOpenedTasks(!isOpenTasks)}
              >
                Select:
              </button>
              {isOpenTasks && (
                <div className="define-task-box">
                  {takeTasks.map((task, i) => (
                    <div
                      className="task-picker"
                      key={i}
                      onClick={() => handleTaskIndex(i)}
                    >
                      <h4>WorkSpace: {task.workSpace}</h4>
                      <h4>Task: {task.task}</h4>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="define-timer-method">
              <span>Which method do you want to work with?</span>
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <div className="timer-method-wrapper">
                  <h4>Standard</h4>
                  <span style={{ fontSize: "14px" }}>
                    With standard method, the timer works until you pause or
                    save it.
                  </span>
                </div>
                <div className="timer-method-wrapper">
                  <h4>Pomodoro</h4>
                  <span style={{ fontSize: "14px" }}>
                    With pomodoro method, you have only 25 min, after this time
                    you can relax (5 or 15 minutes)
                  </span>
                </div>
              </div>
            </div>
            <div className="chosen-task-wrapper">
              {taskIndex === null ? (
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  <BsDatabaseExclamation
                    style={{ fontSize: "24px", color: "#fb2985" }}
                  />
                  Task is not selected yet...
                </span>
              ) : (
                <div className="defined-task-wrapper">
                  <h3>WorkSpace: {takeTasks[taskIndex].workSpace}</h3>
                  <p>
                    Task:{" "}
                    <span
                      style={{
                        backgroundColor: "#14bc87",
                        padding: "2.5px",
                        color: "#fff",
                        borderRadius: "2.5px",
                      }}
                    >
                      {takeTasks[taskIndex].task}
                    </span>
                  </p>
                  <p>
                    Existing:{" "}
                    <span
                      style={{
                        backgroundColor: "#fb2985",
                        padding: "2.5px",
                        color: "#fff",
                        borderRadius: "2.5px",
                      }}
                    >
                      {takeTasks[taskIndex].existing}
                    </span>
                  </p>
                  <p>
                    Stored Timer:{" "}
                    <span
                      style={{
                        backgroundColor: "#f07043",
                        padding: "2.5px",
                        color: "#fff",
                        borderRadius: "2.5px",
                      }}
                    >
                      {takeTasks[taskIndex].storedTime}
                    </span>
                  </p>
                  <p>
                    Priority:{" "}
                    <span
                      style={{
                        backgroundColor:
                          takeTasks[taskIndex].priority === "high"
                            ? "#85170e"
                            : takeTasks[taskIndex].priority === "medium"
                            ? "#dbba25"
                            : "#4efb94",
                        padding: "2.5px",
                        color: "#fff",
                        borderRadius: "2.5px",
                      }}
                    >
                      {takeTasks[taskIndex].priority}
                    </span>
                  </p>
                </div>
              )}
            </div>
            <RunTimer />
          </div>
        </div>
        <div className="timer-output-wrapper">
          <div className="timer-output">
            <span style={{ display: "flex", alignItems: "center" }}>
              <span className="timer-output-item">00</span>{" "}
              <span className="timer-dots">:</span>
              <span className="timer-output-item">00</span>
              <span className="timer-dots">:</span>
              <span className="timer-output-item">00</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timer;
