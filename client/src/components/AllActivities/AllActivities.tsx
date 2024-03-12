import React, { useState } from "react";
import "./AllActivities.css";
import { IoMdCloseCircle } from "react-icons/io";

const take = [
  {
    workspace: "Test A",
    complete: true,
    duratio: "03:36:06",
    priority: "high",
    createdAt: "03-09/17:56",
  },
  {
    workspace: "Test V",
    complete: false,
    duratio: "03:36:06",
    priority: "easy",
    createdAt: "03-09/17:56",
  },
  {
    workspace: "Test C",
    complete: true,
    duratio: "03:36:06",
    priority: "high",
    createdAt: "03-09/17:56",
  },
  {
    workspace: "Test D",
    complete: false,
    duratio: "03:36:06",
    priority: "medium",
    createdAt: "03-09/17:56",
  },
  {
    workspace: "Test A",
    complete: true,
    duratio: "03:36:06",
    priority: "high",
    createdAt: "03-09/17:56",
  },
  {
    workspace: "Test V",
    complete: false,
    duratio: "03:36:06",
    priority: "easy",
    createdAt: "03-09/17:56",
  },
  {
    workspace: "Test C",
    complete: true,
    duratio: "03:36:06",
    priority: "high",
    createdAt: "03-09/17:56",
  },
  {
    workspace: "Test D",
    complete: false,
    duratio: "03:36:06",
    priority: "medium",
    createdAt: "03-09/17:56",
  },
];

const AllActivities = () => {
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [customFilter, setCustomFilter] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomFilter(e.target.value);
  };

  return (
    <div className="all-activities-wapper">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3>Recently activities</h3>
        <div className="active-filter">
          <span>Acts: {take.length}</span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <button style={{ backgroundColor: "#14bc87", color: "#fff" }}>
              Done
            </button>
            <button style={{ backgroundColor: "#fb2985", color: "#fff" }}>
              Failed
            </button>
            <button
              style={{ border: "1px solid" }}
              onClick={() => setIsCustom(!isCustom)}
            >
              {isCustom ? "Hide" : "Custom"}
            </button>
            {isCustom && (
              <div className="custom-filter-input">
                <input
                  type="text"
                  value={customFilter}
                  onChange={handleInput}
                  placeholder="priority:high"
                />
                {customFilter !== "" && (
                  <IoMdCloseCircle onClick={() => setCustomFilter("")} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="all-acts-header">
        <span className="act-header-item">
          <b>#Workspace</b>
        </span>
        <span className="act-header-item">
          <b>#Complete</b>
        </span>
        <span className="act-header-item">
          <b>#Duration</b>
        </span>
        <span className="act-header-item">
          <b>#Priority</b>
        </span>
        <span className="act-header-item">
          <b>#CreatedAt</b>
        </span>
      </div>
      <div className="active-wrapper">
        {take.map((active, i) => (
          <div className="single-active" key={i}>
            <span>{active.workspace}</span>
            <span
              style={{
                color: "#fff",
                padding: "2.5px",
                borderRadius: "2.5px",
                backgroundColor: active.complete ? "#01c380" : "#fb2985",
              }}
            >
              {active.complete ? "True" : "False"}
            </span>
            <span>{active.duratio}</span>
            <span
              style={{
                backgroundColor:
                  active.priority === "high"
                    ? "#85170e"
                    : active.priority === "medium"
                    ? "#dbba25"
                    : "#4efb94",
                padding: "2.5px",
                color: "#fff",
                borderRadius: "2.5px",
              }}
            >
              {active.priority}
            </span>
            <span>{active.createdAt}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllActivities;
