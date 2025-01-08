import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import LogoutButton from "@/components/LogoutButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface ErrorResponse {
  message: string;
}

const UserDashboard = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [kycStatus, setKycStatus] = useState<
    "Pending" | "Approved" | "Rejected" | null
  >(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchKycStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_HOST}/api/kyc/status`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setKycStatus(response.data.status);
      } catch (error) {
        console.error(error);
      }
    };

    fetchKycStatus();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please upload a file!");

    const formData = new FormData();
    formData.append("document", file);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_HOST}/api/kyc/submit`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast({
        title: "KYC submitted successfully!",
      });
      setKycStatus("Pending");
    } catch (error) {
      const axiosError = error as AxiosError;
      toast({
        title: (axiosError.response?.data as ErrorResponse).message,
        description: "Try again",
      });
    }
  };

  return (
    <div className="p-6">
      <LogoutButton />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>User Dashboard</CardTitle>
          <CardDescription>Submit your KYC document</CardDescription>
        </CardHeader>
        <CardContent>
          {kycStatus === null ? (
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="document">Upload a document</Label>
                  <input
                    id="document"
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="block"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Button type="submit" className="w-full uppercase">
                    Submit KYC
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <p>
              Your KYC status is: <strong>{kycStatus}</strong>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
