import { FC, useEffect } from "react";
import "./WorkSpace.css";
import { useNodeTree } from "../../../store/NodeTreeStore";
import { BsDatabaseExclamation } from "react-icons/bs";
import { useUserStore } from "../../../store/AuthStore";

const WorkSpace: FC<{ setStoreWorkspace: (v: string | null) => void }> = ({
  setStoreWorkspace,
}) => {
  const { fetchEntireNodesName, nodeNames } = useNodeTree();
  const { user } = useUserStore();
  useEffect(() => {
    if (nodeNames.length < 1 && user) {
      fetchEntireNodesName(user.username);
    }
  }, [fetchEntireNodesName, user, nodeNames.length]);

  return (
    <div className="workspace-wrapper">
      {nodeNames.length < 1 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "fit-content",
            flexDirection: "column",
            padding: "5px",
            borderRadius: "5px",
            backgroundColor: "#ccd0cf",
            margin: "0 auto",
            gap: "5px",
          }}
        >
          <BsDatabaseExclamation />
          <span>Workspace was not found!</span>
        </div>
      ) : (
        nodeNames.map((workspace) => (
          <span
            onClick={() => setStoreWorkspace(workspace)}
            className="workspace"
            key={workspace}
          >
            {workspace}
          </span>
        ))
      )}
    </div>
  );
};

export default WorkSpace;
