import { SignInInput } from "../../types";
import "./SingUp.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { SignInValidation } from "../../pages/auth/signValidation";

const SignIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInInput>({
    resolver: zodResolver(SignInValidation),
  });

  const onSubmit = async (values: SignInInput) => {
    console.log(values);
  };
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
      </form>

      <span style={{ margin: "0 auto" }}>--OR--</span>

      <button className="signup-with-google">
        <FcGoogle />
        Sign In with Google
      </button>
    </div>
  );
};

export default SignIn;
