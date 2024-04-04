import { FC } from "react";
import "./Loader.css";

const Loader: FC<{ width?: string; height?: string }> = () => {
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
      <div className="loader" />
    </div>
  );
};

export default Loader;
