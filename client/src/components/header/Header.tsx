import "./Header.scss";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "./logo/Logo";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [hasScrollDown, setHasScrollDown] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollVH = window.innerHeight * 0.1;

      if (window.scrollY >= scrollVH) {
        setHasScrollDown(true);
      } else {
        setHasScrollDown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrollDown]);

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
