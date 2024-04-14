import { FC, useState } from "react";
import "./TimerSetup.scss";
import { useTaskStore } from "../../store/TaskStore";
import TaskNotChosen from "./TaskNotChosen";
import DisplayTimer from "./DisplayTimer";
import TimerControllers from "./TimerControllers";
import { FaWindowClose } from "react-icons/fa";

const Timer: FC<{ setIsOpenTimer: (v: boolean) => void }> = ({
  setIsOpenTimer,
}) => {
  const [taskIdAndInd, setTaskIdAndInd] = useState<{
    taskIndex: number | null;
    taskId: string | undefined;
  }>({ taskId: undefined, taskIndex: null });
  const { tasks } = useTaskStore();

  const handleTaskIndex = (_id: string, ind: number) => {
    const result = {
      taskId: _id,
      taskIndex: ind,
    };

    setTaskIdAndInd(result);
  };

  return (
    <section className="timer-wrapper">
      <div className="timer">
        <FaWindowClose
          style={{
            position: "absolute",
            bottom: "100%",
            right: "0.5%",
            fontSize: "24px",
            color: "orangered",
            cursor: "pointer",
          }}
          onClick={() => setIsOpenTimer(false)}
        />
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
                {tasks.length > 0 ? (
                  tasks.map((task, i) => (
                    <button
                      className="task-picker"
                      key={i}
                      onClick={() => handleTaskIndex(task._id || "", i)}
                      disabled={task.complete}
                      style={{
                        cursor: task.complete ? "not-allowed" : "pointer",
                        backgroundColor: task.complete ? "#14bc87" : "",
                      }}
                    >
                      {taskIdAndInd.taskId === task._id && (
                        <div
                          style={{
                            position: "absolute",
                            display: "flex",
                            right: "2%",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <div
                            style={{
                              width: "7.5px",
                              height: "7.5px",
                              borderRadius: "50px",
                              backgroundColor: "#06141b",
                              boxShadow: "0 0 1xp #ccd0cf",
                            }}
                          />
                          <span>Picked</span>
                        </div>
                      )}
                      <h4>WorkSpace: {task.workspace}</h4>
                      <h4>Task: {task.task}</h4>
                    </button>
                  ))
                ) : (
                  <TaskNotChosen />
                )}
              </div>
            </div>
            <TimerControllers
              taskIndex={taskIdAndInd.taskIndex}
              taskId={taskIdAndInd.taskId}
              setTaskIndex={setTaskIdAndInd}
            />
          </div>
        </div>
        <DisplayTimer />
      </div>
    </section>
  );
};

export default Timer;
