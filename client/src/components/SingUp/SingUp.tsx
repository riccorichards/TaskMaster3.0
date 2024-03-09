import { SignUpInput } from "../../types";
import "./SingUp.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { SignUpValidation } from "../../pages/auth/signValidation";

const SingUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpInput>({
    resolver: zodResolver(SignUpValidation),
  });

  const onSubmit = async (values: SignUpInput) => {
    console.log(values);
  };
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
          {errors.password && (
            <p className="errors-wrapper">{errors.password.message}</p>
          )}
        </div>

        <button type="submit">Create</button>
      </form>

      <span style={{ margin: "0 auto" }}>--OR--</span>

      <button className="signup-with-google">
        <FcGoogle />
        Sign Up with Google
      </button>
    </div>
  );
};

export default SingUp;