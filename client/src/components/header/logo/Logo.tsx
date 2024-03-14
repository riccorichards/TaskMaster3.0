import { FC } from "react";
import "./Logo.scss";

const Logo: FC<{ hasScrollDown: boolean }> = ({ hasScrollDown }) => {
  return (
    <div
      className="logo-container"
      style={{
        borderColor: hasScrollDown ? "#fff" : "",
        transition: "all 0.25s ease-in-out",
      }}
    >
      <span
        className="logo-text"
        style={{
          color: hasScrollDown ? "orangered" : "",
          transition: "all 0.25s ease-in-out",
        }}
      >{`<n+1/>`}</span>
    </div>
  );
};

export default Logo;
