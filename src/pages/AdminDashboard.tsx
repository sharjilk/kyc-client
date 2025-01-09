import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, CircleX } from "lucide-react";

interface Submission {
  _id: string;
  user: { name: string; email: string };
  status: "Pending" | "Approved" | "Rejected";
  documentUrl: string;
  createdAt: string;
}

interface ErrorResponse {
  message: string;
}

const StatusLabel = ({
  status,
}: {
  status: "Pending" | "Approved" | "Rejected";
}) => {
  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-800",
    Approved: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

const AdminDashboard = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_HOST}/api/kyc/submissions`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSubmissions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubmissions();
  }, [token]);

  const handleAction = async (id: string, action: "Approved" | "Rejected") => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_HOST}/api/kyc/${id}`,
        { status: action },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast({
          title: response.data.message,
        });
      }
      setSubmissions((prev) =>
        prev.map((sub) => (sub._id === id ? { ...sub, status: action } : sub))
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      toast({
        title: (axiosError.response?.data as ErrorResponse).message,
        description: "Try again",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Admin Dashboard</CardTitle>
        <CardDescription>View and approve all KYC submissions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent KYC submissions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Document</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead className="text-right">&nbsp;</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission._id}>
                <TableCell>{submission.user.name}</TableCell>
                <TableCell>{submission.user.email}</TableCell>
                <TableCell>
                  {submission.documentUrl ? (
                    <a
                      href={submission.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Document
                    </a>
                  ) : (
                    "No Document"
                  )}
                </TableCell>
                <TableCell>
                  <StatusLabel status={submission.status} />
                </TableCell>
                <TableCell>
                  {new Date(submission.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      disabled={submission.status !== "Pending"}
                      onClick={() => handleAction(submission._id, "Approved")}
                    >
                      <CircleCheckBig /> Approve
                    </Button>
                    <Button
                      variant={"destructive"}
                      size={"sm"}
                      disabled={submission.status !== "Pending"}
                      onClick={() => handleAction(submission._id, "Rejected")}
                    >
                      <CircleX /> Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;
