import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type Submission = {
  id: string;
  user: { email: string };
  status: "Pending" | "Approved" | "Rejected";
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
      await axios.patch(
        `${import.meta.env.VITE_API_HOST}/api/kyc/${id}`,
        { status: action },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubmissions((prev) =>
        prev.map((sub) => (sub.id === id ? { ...sub, status: action } : sub))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">User</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id}>
              <td className="border px-4 py-2">{submission.user.email}</td>
              <td className="border px-4 py-2">{submission.status}</td>
              <td className="border px-4 py-2 space-x-2">
                {submission.status === "Pending" && (
                  <>
                    <button
                      className="bg-green-500 text-white py-1 px-2"
                      onClick={() => handleAction(submission.id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2"
                      onClick={() => handleAction(submission.id, "Rejected")}
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
