import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../styles/Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await loginUser(formData);

      // Save JWT Token
localStorage.setItem("token", data.token);

// Save Logged-In User
localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);

alert("Login Successful!");

      window.location.href = "/dashboard";

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="login-page">

      <div className="login-left">
        <div className="login-overlay">

          <h1>Welcome Back 👋</h1>

          <p>
            Log in to continue managing your finances with
            FinSight.
          </p>

          <div className="login-features">

            <div className="feature-item">
              ✔ Secure Authentication
            </div>

            <div className="feature-item">
              ✔ Smart Expense Tracking
            </div>

            <div className="feature-item">
              ✔ Beautiful Analytics
            </div>

          </div>

        </div>
      </div>

      <div className="login-right">

        <div className="login-card">

          <h2>Login</h2>

          <p className="subtitle">
            Access your FinSight account
          </p>

          <form onSubmit={handleSubmit}>

            <div className="input-group">

              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
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
                  placeholder="Enter your password"
                  required
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

            <div className="login-options">

              <label className="remember">

                <input type="checkbox" />

                Remember Me

              </label>

              <a href="/">Forgot Password?</a>

            </div>

            <button
              className="login-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="register-link">
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;