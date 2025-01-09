import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "@/hooks/use-toast";

interface Submission {
  _id: string;
  user: { name: string; email: string };
  status: "Pending" | "Approved" | "Rejected";
  documentUrl: string;
}

interface ErrorResponse {
  message: string;
}

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
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      </div>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Document</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission._id}>
              <td className="border px-4 py-2">{submission.user.name}</td>
              <td className="border px-4 py-2">{submission.user.email}</td>
              <td className="border px-4 py-2">
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
              </td>
              <td className="border px-4 py-2">{submission.status}</td>
              <td className="border px-4 py-2 space-x-2">
                {submission.status === "Pending" && (
                  <>
                    <button
                      className="bg-green-500 text-white py-1 px-2"
                      onClick={() => handleAction(submission._id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2"
                      onClick={() => handleAction(submission._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
