import { useEffect, useState } from "react";
import api from "../services/api";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load users");
    }
  };

  const deleteUser = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("User Deleted Successfully");
      fetchUsers();
    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">Manage Users</h2>

      {users.length === 0 ? (
        <div className="alert alert-info">No users found.</div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.phone}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageUsers;