import { useCallback, useState } from "react";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "@/redux/slices/authSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import DOMPurify from "dompurify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, LoginFormValues } from "@/validation/loginValidation";
import { LoaderCircle, Eye, EyeOff } from "lucide-react";

interface ErrorResponse {
  message: string;
}

const LoginForm = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(
    async (data: LoginFormValues) => {
      setIsLoading(true);

      const sanitizedData = {
        email: DOMPurify.sanitize(data.email),
        password: DOMPurify.sanitize(data.password),
      };

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_HOST}/api/auth/login`,
          sanitizedData
        );

        if (response.data.success) {
          toast({
            title: response.data.message,
          });
          const { token, user } = response.data.data;

          dispatch(setAuth({ token, user }));
          navigate(user.role === "Admin" ? "/admin/dashboard" : "/dashboard");
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        console.log((axiosError.response?.data as ErrorResponse).message);
        toast({
          title: "Invalid login credentials",
          description: "Try again",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, navigate, toast]
  );

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Log In to your account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={errors.password ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full uppercase"
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin" size={16} />
                ) : (
                  "Log In"
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col justify-between">
        <Separator />
        <p className="px-8 mt-4 mb-4 text-center text-lg">
          Don't have an account?
        </p>
        <Link to="/" className="w-full">
          <Button variant="outline" className="bg-gray-200 uppercase w-full">
            Sign Up
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
