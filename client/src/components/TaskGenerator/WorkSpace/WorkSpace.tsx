import { FC } from "react";
import "./WorkSpace.css";
import { useNodeTree } from "../../../store/NodeTreeStore";

const WorkSpace: FC<{ setStoreWorkspace: (v: string | null) => void }> = ({
  setStoreWorkspace,
}) => {
  const { nodeNames } = useNodeTree();
  return (
    <div className="workspace-wrapper">
      {nodeNames &&
        nodeNames.map((workspace) => (
          <span
            onClick={() => setStoreWorkspace(workspace)}
            className="workspace"
            key={workspace}
          >
            {workspace}
          </span>
        ))}
    </div>
  );
};

export default WorkSpace;
