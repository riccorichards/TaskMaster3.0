import { useEffect, useState } from "react";
import { useTimerStore } from "../../store/TimerStore";
import Utils from "../../utils/Utils";

const DisplayTimer = () => {
  const { timerValue } = useTimerStore();
  const handleTime =
    timerValue === 0 ? "00:00:00" : Utils.formatDuration(timerValue);
  const sec = handleTime.split(":")[2];
  const min = handleTime.split(":")[1];
  const hr = handleTime.split(":")[0];
  const [screeSize, setScreenSize] = useState<number>(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => removeEventListener("resize", handleResize);
  }, [screeSize]);
  return (
    <div className="timer-output-wrapper">
      <div className="timer-output">
        <span
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: screeSize < 500 ? "column-reverse" : "row",
            gap: screeSize < 500 ? "5px" : "",
          }}
        >
          <span className="timer-output-item">{hr}</span>{" "}
          {screeSize > 500 && <span className="timer-dots">:</span>}
          <span className="timer-output-item">{min}</span>
          {screeSize > 500 && <span className="timer-dots">:</span>}
          <span className="timer-output-item">{sec}</span>
        </span>
      </div>
    </div>
  );
};

export default DisplayTimer;
