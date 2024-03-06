import "./Header.scss";
import { RiTimerFlashFill } from "react-icons/ri";
import { FaSignInAlt } from "react-icons/fa";

const Header = () => {
  return (
    <header>
      <div className="logo-wrapper">
        <RiTimerFlashFill />
        <p>Time for us</p>
      </div>
      <button>
        <span>Sign up</span>
        <FaSignInAlt />
      </button>
    </header>
  );
};

export default Header;
