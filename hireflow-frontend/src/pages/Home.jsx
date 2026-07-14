import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container text-center mt-5">
      <h1 className="text-primary">HireFlow AI</h1>
      <h3>AI Powered Recruitment Portal</h3>
      <p>Find your dream job with HireFlow.</p>

      <Link to="/login" className="btn btn-primary me-2">
        Login
      </Link>

      <Link to="/register" className="btn btn-success">
        Register
      </Link>
    </div>
  );
}

export default Home;