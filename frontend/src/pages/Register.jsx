import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerUser(formData);

      alert("Registration Successful!");

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="register-page">

      {/* LEFT */}

      <div className="register-left">

        <div className="register-overlay">

          <h1>Join FinSight 🚀</h1>

          <p>
            Create your account and start managing your money
            smarter with powerful insights and beautiful analytics.
          </p>

          <div className="register-features">

            <div className="feature-item">
              ✔ AI Powered Insights
            </div>

            <div className="feature-item">
              ✔ Track Every Transaction
            </div>

            <div className="feature-item">
              ✔ Bank-Level Security
            </div>

          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div className="register-right">

        <div className="register-card">

          <h2>Create Account</h2>

          <p className="subtitle">
            Start your FinSight journey today
          </p>

          <form onSubmit={handleSubmit}>

            <div className="input-group">

              <label>Full Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />

            </div>

            <div className="input-group">

              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />

            </div>

            <div className="input-group">

              <label>Password</label>

              <div className="password-box">

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                />

                <button
                  type="button"
                  className="show-btn"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

            </div>

            <button
              type="submit"
              className="register-btn"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          <p className="login-link">

            Already have an account?{" "}

            <Link to="/login">
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;