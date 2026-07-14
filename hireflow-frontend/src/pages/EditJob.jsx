import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    experience: "",
    salary: "",
    jobType: "",
    description: "",
  });

  useEffect(() => {
    const fetchJob = async () => {
      const token = localStorage.getItem("token");

      const response = await api.get(`/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJob(response.data);
    };

    fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    await api.put(`/jobs/${id}`, job, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Job Updated Successfully");
    navigate("/manage-jobs");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4">Edit Job</h2>

      <form onSubmit={handleUpdate}>
        <input className="form-control mb-3" name="jobTitle" value={job.jobTitle} onChange={handleChange} />
        <input className="form-control mb-3" name="companyName" value={job.companyName} onChange={handleChange} />
        <input className="form-control mb-3" name="location" value={job.location} onChange={handleChange} />
        <input className="form-control mb-3" name="experience" value={job.experience} onChange={handleChange} />
        <input className="form-control mb-3" name="salary" value={job.salary} onChange={handleChange} />
        <input className="form-control mb-3" name="jobType" value={job.jobType} onChange={handleChange} />
        <textarea className="form-control mb-3" name="description" value={job.description} onChange={handleChange} />

        <button className="btn btn-primary w-100">Update Job</button>
      </form>
    </div>
  );
}

export default EditJob;