import { useEffect, useState } from "react";
import api from "../services/api";

function ViewApplicants() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const token = localStorage.getItem("token");

    const response = await api.get("/applications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setApplications(response.data);
  };

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");

    await api.put(`/applications/${id}/status?status=${status}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert(`Application ${status}`);
    fetchApplications();
  };

  return (
    <div className="container mt-5">
      <h2>Applicants</h2>

      <table className="table table-bordered mt-4">
        <thead className="table-dark">
          <tr>
            <th>Application ID</th>
            <th>User ID</th>
            <th>Job ID</th>
            <th>Status</th>
            <th>Resume</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td>{app.userId}</td>
              <td>{app.jobId}</td>
              <td>{app.status}</td>

              <td>
                {app.resumePath ? (
                  <a
                    className="btn btn-primary btn-sm"
                    href={`http://localhost:8080/api/applications/download/${app.resumePath}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download
                  </a>
                ) : (
                  "No Resume"
                )}
              </td>

              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => updateStatus(app.id, "Shortlisted")}
                >
                  Shortlist
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => updateStatus(app.id, "Rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewApplicants;