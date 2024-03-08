import { FC } from "react";
import { BsDatabaseExclamation } from "react-icons/bs";

const SubGraph: FC<{ subGraph: string[] }> = ({ subGraph }) => {
  return (
    <div className="graphs">
      {subGraph.length > 0 ? (
        subGraph.map((graph, i) => <span key={i}>{graph}</span>)
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <BsDatabaseExclamation style={{ color: "#fb2985" }} />
            <span>Sub graph is not defined...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubGraph;
