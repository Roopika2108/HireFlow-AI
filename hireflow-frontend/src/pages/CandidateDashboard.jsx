import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchCompany, setSearchCompany] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const token = localStorage.getItem("token");

    const response = await api.get("/jobs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setJobs(response.data);
  };

  const searchByTitle = async () => {
    if (searchTitle.trim() === "") {
      fetchJobs();
      return;
    }

    const token = localStorage.getItem("token");

    const response = await api.get(
      `/jobs/search/title?title=${searchTitle}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setJobs(response.data);
  };

  const searchByLocation = async () => {
    if (searchLocation.trim() === "") {
      fetchJobs();
      return;
    }

    const token = localStorage.getItem("token");

    const response = await api.get(
      `/jobs/search/location?location=${searchLocation}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setJobs(response.data);
  };

  const searchByCompany = async () => {
    if (searchCompany.trim() === "") {
      fetchJobs();
      return;
    }

    const token = localStorage.getItem("token");

    const response = await api.get(
      `/jobs/search/company?companyName=${searchCompany}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setJobs(response.data);
  };

  const clearFilters = () => {
    setSearchTitle("");
    setSearchLocation("");
    setSearchCompany("");
    fetchJobs();
  };

  const saveJob = async (jobId) => {
    const token = localStorage.getItem("token");

    try {
      await api.post(
        "/saved-jobs",
        {
          userId: Number(localStorage.getItem("userId")),
          jobId: jobId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job Saved Successfully");
    } catch (error) {
      alert("Job Save Failed");
    }
  };

  const applyJob = async (jobId) => {
    const token = localStorage.getItem("token");

    try {
      await api.post(
        "/applications",
        {
          userId: Number(localStorage.getItem("userId")),
          jobId: jobId,
          status: "Applied",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Application Submitted Successfully");
    } catch (error) {
      alert("Application Failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Candidate Dashboard</h2>

      <div className="card p-4 shadow mb-4">
        <h5 className="mb-3">Search Jobs</h5>

        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Title"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />

            <button
              className="btn btn-primary mt-2 w-100"
              onClick={searchByTitle}
            >
              Search Title
            </button>
          </div>

          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />

            <button
              className="btn btn-success mt-2 w-100"
              onClick={searchByLocation}
            >
              Search Location
            </button>
          </div>

          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Company"
              value={searchCompany}
              onChange={(e) => setSearchCompany(e.target.value)}
            />

            <button
              className="btn btn-warning mt-2 w-100"
              onClick={searchByCompany}
            >
              Search Company
            </button>
          </div>
        </div>

        <button className="btn btn-secondary mt-3" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>

      {jobs.length === 0 ? (
        <h5>No Jobs Found</h5>
      ) : (
        jobs.map((job) => (
          <div className="card mb-3" key={job.id}>
            <div className="card-body">
              <h5>{job.jobTitle}</h5>

              <p>
                {job.companyName} - {job.location}
              </p>

              <p>
                {job.experience} | {job.salary}
              </p>

              <button
                className="btn btn-success me-2"
                onClick={() => applyJob(job.id)}
              >
                Apply Now
              </button>

              <button
                className="btn btn-outline-primary"
                onClick={() => saveJob(job.id)}
              >
                Save Job
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;