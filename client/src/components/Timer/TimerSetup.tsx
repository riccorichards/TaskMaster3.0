import React, { FC, useCallback, useEffect, useState } from "react";
import "./TimerSetup.scss";
import { useTaskStore } from "../../store/TaskStore";
import TaskNotChosen from "./TaskNotChosen";
import DisplayTimer from "./DisplayTimer";
import TimerControllers from "./TimerControllers";
import { FaWindowClose } from "react-icons/fa";

interface Position {
  x: number;
  y: number;
}
const Timer: FC<{ setIsOpenTimer: (v: boolean) => void }> = ({
  setIsOpenTimer,
}) => {
  const [taskIndex, setTaskIndex] = useState<number | null>(null);
  const { tasks } = useTaskStore();
  const handleTaskIndex = (ind: number) => {
    setTaskIndex(ind);
  };

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 150, y: 150 });
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const onMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    },
    [position]
  );

  const onTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      setIsDragging(true);
      const touch = e.touches[0];
      setDragStart({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      });
    },
    [position]
  );

  const onDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;
        setPosition({ x: newX, y: newY });
      }
    },
    [isDragging, dragStart]
  );

  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (isDragging) {
        const touch = e.touches[0];
        const newX = touch.clientX - dragStart.x;
        const newY = touch.clientY - dragStart.y;
        setPosition({ x: newX, y: newY });
      }
    },
    [isDragging, dragStart]
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onDragEnd);
      document.addEventListener("touchmove", onTouchMove);
      document.addEventListener("touchend", onDragEnd);
    } else {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onDragEnd);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onDragEnd);
    }

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onDragEnd);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onDragEnd);
    };
  }, [isDragging, onMouseMove, onDragEnd, onTouchMove]);

  return (
    <section
      className="timer-wrapper"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
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
                      onClick={() => handleTaskIndex(i)}
                      disabled={task.complete}
                      style={{
                        cursor: task.complete ? "not-allowed" : "pointer",
                        backgroundColor: task.complete ? "#14bc87" : "",
                      }}
                    >
                      {taskIndex === i && (
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
