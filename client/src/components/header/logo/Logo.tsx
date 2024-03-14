import { FC } from "react";
import "./Logo.scss";
import { useUserStore } from "../../../store/AuthStore";

const Logo: FC<{ hasScrollDown?: boolean; isAuth: boolean }> = ({
  hasScrollDown,
  isAuth = false,
}) => {
  const { user } = useUserStore();
  return (
    <div
      className="logo-container"
      style={{
        borderColor: user && hasScrollDown ? "#fff" : "",
        transition: "all 0.25s ease-in-out",
        border: isAuth ? "5px solid #fff" : "",
      }}
    >
      <span
        className="logo-text"
        style={{
          color: user && hasScrollDown || isAuth ? "orangered" : "",
          transition: "all 0.25s ease-in-out",
        }}
      >{`<n+1/>`}</span>
    </div>
  );
};

export default Logo;
