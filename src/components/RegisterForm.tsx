import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

interface ErrorResponse {
  message: string;
}

const RegisterForm = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_HOST}/api/auth/register`,
        formData
      );

      if (response.data.success) {
        toast({
          title: response.data.message,
          description: "Login to continue",
        });
        navigate("/login");
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
        <CardTitle>Register an Account</CardTitle>
        <CardDescription>
          Enter your name, email & password to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
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
              <Label>Role</Label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="User"
                    checked={formData.role === "User"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  User
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="Admin"
                    checked={formData.role === "Admin"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Admin
                </label>
              </div>
            </div>
            {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" />
            </div> */}
            <div className="flex flex-col space-y-1.5">
              <Button type="submit" className="w-full uppercase">
                Register
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col justify-between">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <p className="px-8 mt-4 text-center text-lg">
          Already have an account? <br />
          <Link
            to="/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
