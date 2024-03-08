import { FC, useState } from "react";
import "./WorkSpace.css";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import SubGraph from "./SubGraph";
import { MdOutlineAddCircle } from "react-icons/md";

const fakespaces = [
  {
    id: 1,
    workspace: "Blockchain",
    subTasks: ["Smart contract", "Smart A", "Smart B"],
    storedTime: "12:52:13",
  },
  {
    id: 2,
    workspace: "Data Structure",
    subTasks: ["Array", "Heap", "Hash table"],
    storedTime: "8:22:13",
  },
  {
    id: 3,
    workspace: "Smart contracts",
    subTasks: ["Smart fundamentals", "Fundamentals A", "Fundamentals B"],
    storedTime: "4:09:13",
  },
  {
    id: 4,
    workspace: "Blockchain fundamentals",
    subTasks: [],
    storedTime: "3:29:13",
  },
  {
    id: 1,
    workspace: "Blockchain",
    subTasks: ["Smart contract", "Smart A", "Smart B"],
    storedTime: "12:52:13",
  },
  {
    id: 2,
    workspace: "Data Structure",
    subTasks: ["Array", "Heap", "Hash table"],
    storedTime: "8:22:13",
  },
  {
    id: 3,
    workspace: "Smart contracts",
    subTasks: ["Smart fundamentals", "Fundamentals A", "Fundamentals B"],
    storedTime: "4:09:13",
  },
  {
    id: 4,
    workspace: "Blockchain fundamentals",
    subTasks: [],
    storedTime: "3:29:13",
  },
  {
    id: 1,
    workspace: "Blockchain",
    subTasks: ["Smart contract", "Smart A", "Smart B"],
    storedTime: "12:52:13",
  },
  {
    id: 2,
    workspace: "Data Structure",
    subTasks: ["Array", "Heap", "Hash table"],
    storedTime: "8:22:13",
  },
  {
    id: 3,
    workspace: "Smart contracts",
    subTasks: ["Smart fundamentals", "Fundamentals A", "Fundamentals B"],
    storedTime: "4:09:13",
  },
  {
    id: 4,
    workspace: "Blockchain fundamentals",
    subTasks: [],
    storedTime: "3:29:13",
  },
];

const WorkSpace: FC<{ setStoreWorkspace: (v: string | null) => void }> = ({
  setStoreWorkspace,
}) => {
  const [isOpen, setIsOpen] = useState<{ [id: number]: boolean }>({});

  const toggleSubGraph = (id: number) => {
    setIsOpen((prevOpenGraphs) => ({
      ...prevOpenGraphs,
      [id]: !prevOpenGraphs[id],
    }));
  };

  return (
    <div className="workspace-wrapper">
      {fakespaces.map((workspace, i) => (
        <div className="workspace" key={i}>
          <div
            className="add-task"
            onClick={() => setStoreWorkspace(workspace.workspace)}
          >
            <MdOutlineAddCircle />
          </div>
          <h3>{workspace.workspace}</h3>
          <div
            style={{
              display: "flex",
              position: "relative",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span>
              Amount of graphs:{" "}
              <span
                style={{
                  backgroundColor: "#fb2985",
                  color: "#fff",
                  padding: "0 5px",
                  borderRadius: "2.5px",
                }}
              >
                {workspace.subTasks.length}
              </span>
              {isOpen[workspace.id] && (
                <SubGraph subGraph={workspace.subTasks} />
              )}
            </span>
            <button onClick={() => toggleSubGraph(workspace.id)}>
              {!isOpen[workspace.id] ? <FaCaretDown /> : <FaCaretUp />}
            </button>
          </div>
          <span>
            Stored Times:{" "}
            <span
              style={{
                backgroundColor: "#14bc87",
                color: "#fff",
                padding: "2.5px",
                borderRadius: "2.5px",
              }}
            >
              {workspace.storedTime}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default WorkSpace;
