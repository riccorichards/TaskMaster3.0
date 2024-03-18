import { useState } from "react";
import "./Auth.css";
import SingUp from "../../components/SingUp/SingUp";
import SignIn from "../../components/SignIn/SignIn";
import Logo from "../../components/header/logo/Logo";
import authDecor from "../../assets/auth-decor-removebg-preview.png";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  return (
    <div className="auth-wrapper">
      <div className="auth">
        <div className="auth-panel">
          <Logo where="header" />
          <img
            src={authDecor}
            alt="decor"
            style={{
              width: "100%",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
          <span>
            already have an account?{" "}
            <button onClick={() => setIsSignUp(!isSignUp)}>
              {!isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </span>
        </div>
        <div className="auth-form">
          {isSignUp ? <SingUp setIsSignUp={setIsSignUp} /> : <SignIn />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
