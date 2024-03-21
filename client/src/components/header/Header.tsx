import "./Header.scss";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "./logo/Logo";

const Header = () => {
  const navigate = useNavigate();

  const navigateToAuth = () => {
    navigate("/auth");
  };

  return (
    <header>
      <Logo where="header" />
      <button onClick={navigateToAuth}>
        <span>Sign up</span>
        <FaSignInAlt />
      </button>
    </header>
  );
};

export default Header;
