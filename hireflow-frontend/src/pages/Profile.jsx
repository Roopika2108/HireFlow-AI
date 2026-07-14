import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      const response = await api.get(`/users/email/${email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load profile");
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const updatedData = {
        fullName: user.fullName,
        phone: user.phone,
      };

      await api.put(`/users/${user.id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Profile Updated Successfully");
      setEditMode(false);
      fetchUser();
    } catch (error) {
      console.log(error);
      alert("Profile Update Failed");
    }
  };

  if (!user) {
    return <h3 className="text-center mt-5">Loading profile...</h3>;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Candidate Profile</h2>

      <div className="card shadow p-4">
        <label>Name</label>
        <input
          className="form-control mb-3"
          name="fullName"
          value={user.fullName || ""}
          disabled={!editMode}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          className="form-control mb-3"
          value={user.email || ""}
          disabled
        />

        <label>Phone</label>
        <input
          className="form-control mb-3"
          name="phone"
          value={user.phone || ""}
          disabled={!editMode}
          onChange={handleChange}
        />

        <label>Role</label>
        <input
          className="form-control mb-3"
          value={user.role || ""}
          disabled
        />

        {!editMode ? (
          <button className="btn btn-primary" onClick={() => setEditMode(true)}>
            Edit Profile
          </button>
        ) : (
          <button className="btn btn-success" onClick={updateProfile}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;