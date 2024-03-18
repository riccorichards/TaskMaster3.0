import { FC } from "react";
import "./Logo.scss";

const Logo: FC<{ where: string }> = ({ where }) => {
  return (
    <div
      className="logo-container"
      style={{
        transition: "all 0.25s ease-in-out",
        border: where === "header" ? "5px solid #ccd0cf" : "",
      }}
    >
      <span
        className="logo-text"
        style={{
          color: where === "header" ? "#06141b" : "",
          textShadow: where === "header" ? "0 0 1px #ccd0cf" : "",
        }}
      >{`<n+1/>`}</span>
    </div>
  );
};

export default Logo;
