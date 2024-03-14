import { FC } from "react";
import "./Logo.scss";
import { useUserStore } from "../../../store/AuthStore";

const Logo: FC<{ hasScrollDown: boolean }> = ({ hasScrollDown }) => {
  const { user } = useUserStore();
  return (
    <div
      className="logo-container"
      style={{
        borderColor: user && hasScrollDown ? "#fff" : "",
        transition: "all 0.25s ease-in-out",
      }}
    >
      <span
        className="logo-text"
        style={{
          color: user && hasScrollDown ? "orangered" : "",
          transition: "all 0.25s ease-in-out",
        }}
      >{`<n+1/>`}</span>
    </div>
  );
};

export default Logo;
