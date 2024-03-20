import { SignInInput } from "../../types";
import "./SingUp.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { SignInValidation } from "../../pages/auth/signValidation";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUserStore } from "../../store/AuthStore";
import Loader from "../Loader/Loader";
import getGoogleOauth from "../../utils/getGoogleOauth";

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

  useEffect(() => {
    if (session) {
      navigate("/dashboard/overview");
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

export default SignIn;
