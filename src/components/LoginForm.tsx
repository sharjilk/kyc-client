import React, { useState } from "react";
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

interface ErrorResponse {
  message: string;
}

const LoginForm = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_HOST}/api/auth/login`,
        formData
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
      toast({
        title: (axiosError.response?.data as ErrorResponse).message,
        description: "Try again",
      });
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Log In to your account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Button type="submit" className="w-full uppercase">
                Log In
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col justify-between">
        <p className="px-8 mt-4 text-center text-lg">
          Don't have an account? <br />
          <Link
            to="/"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
