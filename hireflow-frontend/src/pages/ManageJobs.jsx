import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function ManageJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(response.data);
    } catch (error) {
      alert("Failed to load jobs");
    }
  };
  const deleteJob = async (id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this job?");

    if (!confirmDelete) return;

    try {

        const token = localStorage.getItem("token");

        await api.delete(`/jobs/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        alert("Job Deleted Successfully");

        fetchJobs();

    } catch (error) {

        alert("Failed to delete job");

    }
};

  return (
    <div className="container mt-5">
      <h2>Manage Jobs</h2>

      <table className="table table-bordered mt-4">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Job Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{job.jobTitle}</td>
              <td>{job.companyName}</td>
              <td>{job.location}</td>
              <td>{job.salary}</td>

<td>
    <Link
        to={`/edit-job/${job.id}`}
        className="btn btn-warning btn-sm me-2"
    >
        Edit
    </Link>

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
    </div>
  );
}

export default ManageJobs;