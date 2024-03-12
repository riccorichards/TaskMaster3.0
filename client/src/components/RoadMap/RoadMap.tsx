import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./RoadMap.css";
import { useNodeTree } from "../../store/NodeTreeStore";
import Utils from "../../utils/Utils";
import { IoCloseCircle } from "react-icons/io5";
import MapTreeChart from "./MapTreeChart";
import { TbDatabaseExclamation } from "react-icons/tb";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { useUserStore } from "../../store/AuthStore";

const RoadMap = () => {
  const [node, setNode] = useState<string>("");
  const [workspace, setWorkspace] = useState<string | null>(null);
  const [customErr, setCustomErr] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const originalNode = useRef<string>("");
  const {
    createNewNode,
    isLoading,
    error,
    nodeNames,
    insertNewNode,
    fetchEntireNodesName,
    updateNode,
    fetchEntireNodeTree,
  } = useNodeTree();

  const { user } = useUserStore();
  useEffect(() => {
    if (user?.username) {
      fetchEntireNodesName(user?.username);
      fetchEntireNodeTree(user?.username);
    }
  }, [fetchEntireNodesName, user?.username, fetchEntireNodeTree]);

  if (!user) return null;
  const { username } = user;
  const handleNode = (e: ChangeEvent<HTMLInputElement>) => {
    setNode(e.target.value);
  };

  const handleInsertNode = () => {
    if (node !== "") {
      if (nodeNames) {
        if (nodeNames.length > 0 && !workspace) {
          setCustomErr(
            "If root node is exists, you need to define it to insert new node..."
          );
          return;
        }
        setCustomErr(null);
        const isUpdate = node.split(":")[0] === "update";

        if (isUpdate) {
          const updatedNodeName = node.split(":")[1];
          const updatedNode = {
            username: user.username,
            node: Utils.capitalized(originalNode.current.trim()),
            method: "update",
            updatedNodeName: Utils.capitalized(updatedNodeName.trim()),
          };
          updateNode(updatedNode);
          originalNode.current = "";
          setNode("");
          return;
        }

        const newNode = {
          username: user.username,
          node: Utils.capitalized(node.trim()),
          path: nodeNames.length > 0 && workspace ? workspace : "/",
        };
        if (nodeNames.length > 0 && workspace) {
          insertNewNode(newNode);
        } else {
          createNewNode(newNode);
        }
        setNode("");
        setWorkspace(null);
      }
    }
  };

  function handleUpdateNode(method: string, node: string) {
    if (method === "remove") {
      const removedNode = {
        username,
        node,
        method,
      };

      updateNode(removedNode);
    } else if (method === "update") {
      if (inputRef.current) {
        inputRef.current.focus();
        originalNode.current = node;
        setNode(`update:${node}`);
      }
    }
  }

  const handleSetWorkspace = (node: string) => {
    if (node === workspace) {
      setWorkspace(null);
    } else {
      setWorkspace(node);
    }
  };
  return (
    <div className="roadmap-wrapper" id="Road Map">
      <div className="roadmap">
        <div className="roadmap-setup">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <input
              type="text"
              ref={inputRef}
              value={node}
              onChange={handleNode}
              placeholder={
                nodeNames.length > 0 ? "Add child node" : "Add Root Node..."
              }
            />
            <button onClick={handleInsertNode}>
              {isLoading ? "Submit..." : "Sumbit"}
            </button>
          </div>
          {nodeNames.length === 0 && (
            <p style={{ fontWeight: "bold" }}>
              <i>
                You need to add{" "}
                <span
                  style={{
                    color: "#f07043",
                    padding: "2.5px",
                    backgroundColor: "#fff",
                    borderRadius: "2.5px",
                  }}
                >
                  The root node!
                </span>
              </i>
            </p>
          )}
          {error && <p style={{ color: "red" }}>Something went wrong...</p>}
          {customErr && <p style={{ color: "red" }}>{customErr}</p>}
          <div className="existing-workspace-list">
            {nodeNames.map((node) => (
              <span
                onClick={() => handleSetWorkspace(node)}
                key={node}
                style={{ backgroundColor: node === workspace ? "#1e6c82" : "" }}
              >
                <div
                  className="remove-node"
                  onClick={() => handleUpdateNode("remove", node)}
                >
                  <IoCloseCircle />
                </div>
                {node}
                <div
                  className="update-node"
                  onClick={() => handleUpdateNode("update", node)}
                >
                  <BiSolidMessageSquareEdit />
                </div>
              </span>
            ))}
          </div>
        </div>
        <div className="roadmap-chart">
          {nodeNames.length > 0 ? (
            <MapTreeChart />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize: "24px",
                }}
              >
                <TbDatabaseExclamation style={{ color: "#fb2985" }} />
                <span>Data is not exist or it is available</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoadMap;
