import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AdminKpi = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const [stats, setStats] = useState({
    totalUsers: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_HOST}/api/kyc/kpi`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStats(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin KPI</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Users</h2>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Approved KYC</h2>
          <p className="text-2xl font-bold">{stats.approved}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Rejected KYC</h2>
          <p className="text-2xl font-bold">{stats.rejected}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Pending KYC</h2>
          <p className="text-2xl font-bold">{stats.pending}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminKpi;
