import { SignInInput } from "../../types";
import "./SingUp.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { SignInValidation } from "../../pages/auth/signValidation";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserStore } from "../../store/AuthStore";
import Loader from "../Loader/Loader";

const SignIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignInInput>({
    resolver: zodResolver(SignInValidation),
  });
  const { isLoading, error, login, session } = useUserStore();
  const navigate = useNavigate();
  const onSubmit = async (values: SignInInput) => {
    login(values);
    reset();
  };
  const [googleError, setGoogleError] = useState<string | null>(null);

  const loginWithGoogle = () => {
    setGoogleError("Authentication with Google now is not available");
  };

  useEffect(() => {
    if (session) {
      navigate("/dashboard");
    }
  }, [session, navigate]);

  if (isLoading) return <Loader />;

  return (
    <div className="signup-wrapper">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <h4>Email address:</h4>
          <input
            type="email"
            placeholder="Ricco@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="errors-wrapper">{errors.email.message}</p>
          )}
        </div>
        <div className="input-wrapper">
          <h4>Password:</h4>
          <input
            type="password"
            placeholder="12345678"
            {...register("password")}
          />
          {errors.password && (
            <p className="errors-wrapper">{errors.password.message}</p>
          )}
        </div>

        <button type="submit">Log In</button>
        {error && <p className="errors-wrapper">Error: {error}</p>}
      </form>

      <span style={{ margin: "0 auto" }}>--OR--</span>

      <button className="signup-with-google" onClick={loginWithGoogle}>
        <FcGoogle />
        Sign In with Google
      </button>
      {googleError && (
        <p style={{ fontSize: "14px", color: "red" }}>{googleError}</p>
      )}
    </div>
  );
};

export default SignIn;
