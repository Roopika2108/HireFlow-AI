import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/users/login", {
                email,
                password
            });

            // Save Login Details
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", email);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("role", response.data.role);

            // Redirect based on role
            if (response.data.role === "RECRUITER") {
                navigate("/recruiter");
            } else {
                navigate("/dashboard");
            }

        } catch (error) {

            alert("Invalid Email or Password");

        }

    };

    return (

        <div className="container mt-5" style={{ maxWidth: "400px" }}>

            <h2 className="text-center mb-4">Login</h2>

            <form onSubmit={handleLogin}>

                <div className="mb-3">

                    <label>Email</label>

                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                </div>

                <div className="mb-3">

                    <label>Password</label>

                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                </div>

                <button className="btn btn-primary w-100">
                    Login
                </button>

            </form>

        </div>

    );

}

export default Login;