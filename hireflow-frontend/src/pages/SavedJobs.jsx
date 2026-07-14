import { useEffect, useState } from "react";
import api from "../services/api";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = Number(localStorage.getItem("userId"));

      const savedResponse = await api.get(
        `/saved-jobs/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const savedJobDetails = await Promise.all(
        savedResponse.data.map(async (savedJob) => {
          const jobResponse = await api.get(`/jobs/${savedJob.jobId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          return {
            savedJobId: savedJob.id,
            ...jobResponse.data,
          };
        })
      );

      setSavedJobs(savedJobDetails);
    } catch (error) {
      console.error(error);
      alert("Failed to load saved jobs");
    } finally {
      setLoading(false);
    }
  };

  const removeSavedJob = async (savedJobId) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/saved-jobs/${savedJobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Saved Job Removed Successfully");
      fetchSavedJobs();
    } catch (error) {
      console.error(error);
      alert("Failed to remove saved job");
    }
  };

  const applyJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      const userId = Number(localStorage.getItem("userId"));

      await api.post(
        "/applications",
        {
          userId: userId,
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
      console.error(error);
      alert("Application Failed");
    }
  };

  if (loading) {
    return <h3 className="text-center mt-5">Loading saved jobs...</h3>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">My Saved Jobs</h2>

      {savedJobs.length === 0 ? (
        <div className="alert alert-info">
          You have not saved any jobs yet.
        </div>
      ) : (
        savedJobs.map((job) => (
          <div className="card mb-3 shadow-sm" key={job.savedJobId}>
            <div className="card-body">
              <h5>{job.jobTitle}</h5>

              <p>
                {job.companyName} - {job.location}
              </p>

              <p>
                {job.experience} | {job.salary}
              </p>

              <p>{job.jobType}</p>

              <button
                className="btn btn-success me-2"
                onClick={() => applyJob(job.id)}
              >
                Apply Now
              </button>

              <button
                className="btn btn-outline-danger"
                onClick={() => removeSavedJob(job.savedJobId)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default SavedJobs;