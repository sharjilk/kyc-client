import { Link } from "react-router-dom";
import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="mx-auto flex w-full h-screen flex-col content-center justify-center space-y-6 sm:w-[350px]">
      <LoginForm />
      <p className="px-8 text-center text-sm text-muted-foreground pb-6">
        By signing up, you agree to our <br />
        <Link
          to="#"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          to="#"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default Login;
