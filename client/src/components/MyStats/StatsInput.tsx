import { useState } from "react";
import { NewJourneyType } from "../../types";
import Utils from "../../utils/Utils";
import { useUserStore } from "../../store/AuthStore";

const StatsInput = () => {
  const [input, setInput] = useState<NewJourneyType>({
    journeyDuration: "",
    allocatedTime: 150,
  });

  const [errorHandler, setErrorhandler] = useState<string | null>(null);
  const { error, newJourney, user } = useUserStore();
  if (!user) return null;
  const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitNewJourney = () => {
    const hrs = Number(input.allocatedTime);
    if (!Utils.validPeriod(input.journeyDuration)) {
      setErrorhandler(
        "Journey date should be in the format YYYY-MM-DD and within a valid range."
      );
      return;
    } else if (typeof hrs !== "number") {
      setErrorhandler("The hours should be a number.");
      return;
    }

    setErrorhandler(null);
    const { journeyDuration } = input;
    newJourney({ journeyDuration, allocatedTime: hrs });
  };

  const reset = () => {
    newJourney({ journeyDuration: "", allocatedTime: 0 });
  };

  return (
    <div className="submit-journey-info">
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span
          style={{
            padding: "3.5px",
            backgroundColor: "#06141b",
            borderRadius: "3.5px",
            color: "#ccd0cf",
          }}
        >
          Journey Endpoint
        </span>
        {user?.journeyDuration ? (
          <span
            style={{
              padding: "3.5px",
              backgroundColor: "#9baab8",
              borderRadius: "3.5px",
              border: "1px solid #06141b",
              color: "#4a5c6a",
            }}
          >
            {user?.journeyDuration}
          </span>
        ) : (
          <input
            type="text"
            placeholder="Format (2024-03-09)"
            value={input.journeyDuration}
            name="journeyDuration"
            onChange={handlerOnChange}
          />
        )}
      </div>
      <span style={{ fontSize: "12px" }}>
        Valid duration is this format 2024-03-09
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span
          style={{
            padding: "3.5px",
            backgroundColor: "#06141b",
            borderRadius: "3.5px",
            color: "#ccd0cf",
          }}
        >
          Allocated time
        </span>
        {user?.allocatedTime ? (
          <span
            style={{
              padding: "3.5px",
              backgroundColor: "#9baab8",
              borderRadius: "3.5px",
              border: "1px solid #06141b",
              color: "#4a5c6a",
            }}
          >
            {user.allocatedTime} Hours
          </span>
        ) : (
          <input
            type="text"
            placeholder="Format 150"
            value={input.allocatedTime}
            onChange={handlerOnChange}
            name="allocatedTime"
          />
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <button className="submit-journey-btn" onClick={handleSubmitNewJourney}>
          New journey
        </button>
        {user.allocatedTime > 0 && user.journeyDuration && (
          <button className="reset-journey-btn" onClick={reset}>
            Reset
          </button>
        )}
      </div>
      {errorHandler && (
        <p style={{ color: "red", fontSize: "12px" }}>{errorHandler}</p>
      )}
      {error && (
        <p style={{ color: "red", fontSize: "12px" }}>Error: {error}</p>
      )}
    </div>
  );
};

export default StatsInput;
