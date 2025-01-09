import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
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
import SidebarNav from "@/components/SidebarNav";
import { Icons } from "@/components/Icons";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DOMPurify from "dompurify";
import { KycFormValues, kycSchema } from "@/validation/kycValidation";
import { LoaderCircle } from "lucide-react";

interface ErrorResponse {
  message: string;
}

const UserDashboard = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [kycStatus, setKycStatus] = useState<
    "Pending" | "Approved" | "Rejected" | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<KycFormValues>({
    resolver: zodResolver(kycSchema),
  });

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

  const onSubmit = async (data: KycFormValues) => {
    setIsLoading(true);

    const sanitizedFile = DOMPurify.sanitize(data.file.name);

    const formData = new FormData();
    formData.append("document", data.file, sanitizedFile);

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
    } finally {
      setIsLoading(false);
    }
  };

  const dashboardConfig = {
    sidebarNav: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: "dashboard" as keyof typeof Icons,
      },
      {
        title: "Profile",
        href: "/dashboard/profile",
        icon: "user" as keyof typeof Icons,
        disabled: true,
      },
    ],
  };

  return (
    <>
      <div className="flex min-h-screen flex-col space-y-6 pt-16">
        <div className="grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
          <aside className="w-[200px] flex-col md:flex pl-8">
            <SidebarNav items={dashboardConfig.sidebarNav} showLogout={true} />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>User Dashboard</CardTitle>
                <CardDescription>Submit your KYC document</CardDescription>
              </CardHeader>
              <CardContent>
                {kycStatus === null ? (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="document">Upload a document</Label>
                        <Input
                          id="document"
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setValue("file", file);
                            }
                          }}
                          className={errors.file ? "border-red-500" : ""}
                        />
                        {errors.file?.message && (
                          <p className="text-red-500 text-sm">
                            {String(errors.file.message)}
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
                            "Submit KYC"
                          )}
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
          </main>
        </div>
      </div>

      {/* <div className="p-6">
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
      </div> */}
    </>
  );
};

export default UserDashboard;
