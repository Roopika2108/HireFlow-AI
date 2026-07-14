import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    navigate("/login");

  };

  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">

      <Link className="navbar-brand fw-bold" to="/">
        HireFlow AI
      </Link>

      <div className="ms-auto">

        <Link className="btn btn-light me-2" to="/dashboard">
          Jobs
        </Link>

        <Link className="btn btn-light me-2" to="/my-applications">
          My Applications
        </Link>

        <Link className="btn btn-light me-2" to="/saved-jobs">
          Saved Jobs
        </Link>

        <Link className="btn btn-light me-2" to="/profile">
          Profile
        </Link>

        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>

      </div>

    </nav>

  );

}

export default Navbar;