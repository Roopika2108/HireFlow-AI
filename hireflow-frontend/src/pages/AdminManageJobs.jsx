import { useEffect, useState } from "react";
import api from "../services/api";

function AdminManageJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/admin/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load jobs");
    }
  };

  const deleteJob = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/admin/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Job Deleted Successfully");
      fetchJobs();
    } catch (error) {
      console.error(error);
      alert("Failed to delete job");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">Admin - Manage Jobs</h2>

      {jobs.length === 0 ? (
        <div className="alert alert-info">No jobs found.</div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Job Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Experience</th>
              <th>Salary</th>
              <th>Job Type</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.id}</td>
                <td>{job.jobTitle}</td>
                <td>{job.companyName}</td>
                <td>{job.location}</td>
                <td>{job.experience}</td>
                <td>{job.salary}</td>
                <td>{job.jobType}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteJob(job.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminManageJobs;