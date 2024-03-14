import { useState } from "react";
import "./Auth.css";
import SingUp from "../../components/SingUp/SingUp";
import SignIn from "../../components/SignIn/SignIn";
import Logo from "../../components/header/logo/Logo";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
  return (
    <div className="auth-wrapper">
      <div className="auth">
        <div className="auth-panel">
          <Logo isAuth />
          <div>
            <h2>Embark on a Journey to Mastery with TaskMaster3.0</h2>
            <p>
              Craft a personalized path to professional excellence with
              TaskMaster3.0 — your ally in mastering any field. Let's navigate
              the road to success together!
            </p>
          </div>
          <span>
            already has an account?{" "}
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
