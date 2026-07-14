import { useNavigate } from "react-router-dom";

function RecruiterDashboard() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2 className="text-primary">Recruiter Dashboard</h2>
      <hr />

      <div className="card shadow p-3 mb-3">
        <h4>Post Jobs</h4>
        <p>Create a new job opening.</p>
        <button className="btn btn-primary" onClick={() => navigate("/post-job")}>
          Post Job
        </button>
      </div>

      <div className="card shadow p-3 mb-3">
        <h4>Manage Jobs</h4>
        <p>Edit or delete posted jobs.</p>
        <button className="btn btn-success" onClick={() => navigate("/manage-jobs")}>
          View Jobs
        </button>
      </div>

      <div className="card shadow p-3 mb-3">
        <h4>Applicants</h4>
        <p>View all candidates.</p>
        <button className="btn btn-warning" onClick={() => navigate("/applicants")}>
          View Applicants
        </button>
      </div>
    </div>
  );
}

export default RecruiterDashboard;