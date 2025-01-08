import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

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
      <ul>
        <li>Total Users: {stats.totalUsers}</li>
        <li>Approved KYC: {stats.approved}</li>
        <li>Rejected KYC: {stats.rejected}</li>
        <li>Pending KYC: {stats.pending}</li>
      </ul>
    </div>
  );
};

export default AdminKpi;
