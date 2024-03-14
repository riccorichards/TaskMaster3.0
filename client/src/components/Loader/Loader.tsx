import { FC } from "react";
import "./Loader.css";

const Loader: FC<{ width?: string; height?: string }> = ({
  width = "40px",
  height = "40px",
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="loader" style={{ width, height }} />
    </div>
  );
};

export default Loader;
