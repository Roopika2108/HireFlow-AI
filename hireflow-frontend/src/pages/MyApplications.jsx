import { useEffect, useState } from "react";
import api from "../services/api";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const response = await api.get(`/applications/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load applications");
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Applications</h2>

      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        applications.map((application) => (
          <div className="card mt-3" key={application.id}>
            <div className="card-body">
              <h5>Application ID : {application.id}</h5>
              <p>Job ID : {application.jobId}</p>
              <p>Status : {application.status}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyApplications;