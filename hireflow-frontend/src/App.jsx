import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CandidateDashboard from "./pages/CandidateDashboard";
import MyApplications from "./pages/MyApplications";
import Navbar from "./components/Navbar";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import PostJob from "./pages/PostJob";
import ManageJobs from "./pages/ManageJobs";
import EditJob from "./pages/EditJob";
import ViewApplicants from "./pages/ViewApplicants";
import Profile from "./pages/Profile";
import SavedJobs from "./pages/SavedJobs";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import AdminManageJobs from "./pages/AdminManageJobs";
import AdminApplications from "./pages/AdminApplications";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/admin/applications"element={<AdminApplications />}/>
        <Route path="/admin/jobs" element={<AdminManageJobs />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/applicants" element={<ViewApplicants />} />
        <Route path="/edit-job/:id" element={<EditJob />} />
        <Route path="/manage-jobs" element={<ManageJobs />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/recruiter" element={<RecruiterDashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<CandidateDashboard />} />
        <Route path="/my-applications" element={<MyApplications />} />
      </Routes>
    </>
  );
}

export default App;