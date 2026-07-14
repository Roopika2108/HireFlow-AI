import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalApplications: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(response.data);

    } catch (error) {

      console.error(error);
      alert("Failed to load admin statistics");

    }
  };

  return (

    <div className="container mt-5">

      <h2 className="mb-4 text-primary">
        Admin Dashboard
      </h2>

      <div className="row">

        <div className="col-md-4 mb-3">

          <div className="card shadow text-center p-4">

            <h5>Total Users</h5>

            <h2>{stats.totalUsers}</h2>

          </div>

        </div>

        <div className="col-md-4 mb-3">

          <div className="card shadow text-center p-4">

            <h5>Total Jobs</h5>

            <h2>{stats.totalJobs}</h2>

          </div>

        </div>

        <div className="col-md-4 mb-3">

          <div className="card shadow text-center p-4">

            <h5>Total Applications</h5>

            <h2>{stats.totalApplications}</h2>

          </div>

        </div>

      </div>

      <div className="text-center mt-4">

        <button
          className="btn btn-primary me-3"
          style={{ width: "180px" }}
          onClick={() => navigate("/admin/users")}
        >
          Manage Users
        </button>

        <button
          className="btn btn-success"
          style={{ width: "180px" }}
          onClick={() => navigate("/admin/jobs")}
        >
          Manage Jobs
        </button>

        <button
            className="btn btn-warning ms-3"
            style={{ width: "180px" }}
            onClick={() => navigate("/admin/applications")}
        >
            View Applications
        </button>

      </div>

    </div>

  );
}

export default AdminDashboard;