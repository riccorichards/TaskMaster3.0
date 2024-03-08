import { useState } from "react";
import { FaPause, FaPlay, FaSave } from "react-icons/fa";
import { HiDocumentRemove } from "react-icons/hi";

const RunTimer = () => {
  const [isRunTimer, setIsRunTimer] = useState<boolean>(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <>
        {!isRunTimer ? (
          <div className="run-timer-btn" onClick={() => setIsRunTimer(true)}>
            <FaPlay />
          </div>
        ) : (
          <div className="run-timer-btn" onClick={() => setIsRunTimer(false)}>
            <FaPause />
          </div>
        )}
      </>
      <div className="run-timer-btn">
        <HiDocumentRemove />
      </div>
      <div className="run-timer-btn">
        <FaSave />
      </div>
    </div>
  );
};

export default RunTimer;
