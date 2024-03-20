import { SignUpInput } from "../../types";
import "./SingUp.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { SignUpValidation } from "../../pages/auth/signValidation";
import { useUserStore } from "../../store/AuthStore";
import { FC, useEffect } from "react";
import Loader from "../Loader/Loader";
import getGoogleOauth from "../../utils/getGoogleOauth";

const SingUp: FC<{ setIsSignUp: (v: boolean) => void }> = ({ setIsSignUp }) => {
  const { isLoading, error, signup, user } = useUserStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignUpInput>({
    resolver: zodResolver(SignUpValidation),
  });

  const onSubmit = async (values: SignUpInput) => {
    signup(values);
    reset();
  };

  useEffect(() => {
    if (user) {
      setIsSignUp(false);
    }
  }, [user, setIsSignUp]);

  if (isLoading) return <Loader />;
  return (
    <div className="signup-wrapper">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <h4>Username:</h4>
          <input
            type="text"
            placeholder="RiccoRichards"
            {...register("username")}
          />
          {errors.username && (
            <p className="errors-wrapper">{errors.username.message}</p>
          )}
        </div>
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
        <div className="input-wrapper">
          <h4>Confirm password:</h4>
          <input
            type="password"
            placeholder="12345678"
            {...register("confPassword")}
          />
          {errors.confPassword && (
            <p className="errors-wrapper">{errors.confPassword.message}</p>
          )}
        </div>

        <button type="submit">Create</button>
        {error && (
          <p style={{ fontSize: "14px", color: "red" }}>Error: {error}</p>
        )}
      </form>

      <span style={{ margin: "0 auto" }}>--OR--</span>

      <a
        href={getGoogleOauth()}
        style={{ textDecoration: "none", width: "100%" }}
      >
        <button className="signup-with-google">
          <FcGoogle />
          Start with Google
        </button>
      </a>
    </div>
  );
};

export default SingUp;
