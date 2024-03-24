import { FC, useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaSave } from "react-icons/fa";
import { HiDocumentRemove } from "react-icons/hi";
import { useTimerStore } from "../../store/TimerStore";
import { useTaskStore } from "../../store/TaskStore";
import Utils from "../../utils/Utils";

const TimerControllers: FC<{
  taskIndex: number | null;
  setTaskIndex: (v: number | null) => void;
}> = ({ taskIndex, setTaskIndex }) => {
  const [errorHandler, setErrorHadler] = useState<string | null>(null);
  const [isRunTimer, setIsRunTimer] = useState<boolean>(false);
  const pauseStartTime = useRef<number>(0);
  const totalPauseTime = useRef<number>(0);
  const initialStartTime = useRef<number>(0);
  const { takeTime } = useTimerStore();
  const { tasks } = useTaskStore();
  const { completeTask } = useTaskStore();
  const delta = useRef<number>(0);
  useEffect(() => {
    let frame: number;
    if (isRunTimer) {
      if (initialStartTime.current > 0) {
        initialStartTime.current = initialStartTime.current || Date.now();
      }

      const runningTimer = () => {
        const currentTimer = Date.now();
        const adjustedCurrentTime = currentTimer - totalPauseTime.current;
        delta.current = (adjustedCurrentTime - initialStartTime.current) / 1000;
        takeTime(delta.current);
        frame = requestAnimationFrame(runningTimer);
      };

      frame = requestAnimationFrame(runningTimer);
    }

    return () => cancelAnimationFrame(frame);
  }, [isRunTimer, takeTime]);

  function startTimer() {
    if (taskIndex === null) {
      setErrorHadler("Please, select the task to start the timer!");
      return;
    }
    setErrorHadler(null);

    if (!isRunTimer) {
      if (pauseStartTime.current > 0) {
        const pauseDuration = Date.now() - pauseStartTime.current;
        totalPauseTime.current += pauseDuration;
        pauseStartTime.current = 0;
      } else {
        initialStartTime.current = Date.now();
        totalPauseTime.current = 0;
      }

      setIsRunTimer(true);
    }
  }

  function pauseTimer() {
    if (isRunTimer) {
      setIsRunTimer(false);
      pauseStartTime.current = Date.now();
    }
  }

  function reset() {
    setIsRunTimer(false);
    initialStartTime.current = 0;
    pauseStartTime.current = 0;
    totalPauseTime.current = 0;

    takeTime(0);
  }

  function save() {
    if (delta.current > 0) {
      if (taskIndex !== null) {
        const confirmToComplete = window.confirm(
          "Do you want to save the time?"
        );
        if (confirmToComplete) {
          const isCompleteTask = window.confirm("Do you complete the task?");
          completeTask(tasks[taskIndex]._id || "", {
            storedTime: delta.current,
            complete: isCompleteTask,
          });
          setTimeout(() => {
            Utils.scrollToComponent("Task");
          }, 1000);
        }
        reset();
        setTaskIndex(null);
      }
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        position: "relative",
      }}
    >
      <>
        {!isRunTimer ? (
          <div className="run-timer-btn" onClick={startTimer}>
            <FaPlay />
          </div>
        ) : (
          <div className="run-timer-btn" onClick={pauseTimer}>
            <FaPause />
          </div>
        )}
      </>
      <div className="run-timer-btn" onClick={reset}>
        <HiDocumentRemove />
      </div>
      <div className="run-timer-btn" onClick={save}>
        <FaSave />
      </div>
      {errorHandler && (
        <p
          style={{
            fontSize: "14px",
            color: "red",
            position: "absolute",
            top: "105%",
          }}
        >
          {errorHandler}
        </p>
      )}
    </div>
  );
};

export default TimerControllers;
