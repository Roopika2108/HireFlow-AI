import { useEffect, useState } from "react";
import api from "../services/api";

function AdminApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/admin/applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load applications");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">Admin - All Applications</h2>

      {applications.length === 0 ? (
        <div className="alert alert-info">
          No applications found.
        </div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Application ID</th>
              <th>User ID</th>
              <th>Job ID</th>
              <th>Status</th>
              <th>Resume</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.id}</td>
                <td>{application.userId}</td>
                <td>{application.jobId}</td>
                <td>{application.status}</td>
                <td>
                  {application.resumePath ? (
                    <a
                      className="btn btn-primary btn-sm"
                      href={`http://localhost:8080/api/applications/download/${application.resumePath}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Download Resume
                    </a>
                  ) : (
                    "No Resume"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminApplications;