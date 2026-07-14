import { useState } from "react";
import api from "../services/api";

function PostJob() {
  const [job, setJob] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    experience: "",
    salary: "",
    jobType: "",
    description: "",
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handlePostJob = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post("/jobs", job, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Job Posted Successfully");
    } catch (error) {
      alert("Job Posting Failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4">Post New Job</h2>

      <form onSubmit={handlePostJob}>
        <input className="form-control mb-3" name="jobTitle" placeholder="Job Title" onChange={handleChange} required />
        <input className="form-control mb-3" name="companyName" placeholder="Company Name" onChange={handleChange} required />
        <input className="form-control mb-3" name="location" placeholder="Location" onChange={handleChange} required />
        <input className="form-control mb-3" name="experience" placeholder="Experience" onChange={handleChange} required />
        <input className="form-control mb-3" name="salary" placeholder="Salary" onChange={handleChange} required />
        <input className="form-control mb-3" name="jobType" placeholder="Job Type" onChange={handleChange} required />
        <textarea className="form-control mb-3" name="description" placeholder="Description" onChange={handleChange} required />

        <button className="btn btn-primary w-100">Post Job</button>
      </form>
    </div>
  );
}

export default PostJob;