import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const token = localStorage.getItem("token");

  const destination = token
    ? "/dashboard"
    : "/register";

  return (
    <nav className="navbar">

      <div className="logo">
        <h2>FinSight</h2>
      </div>

      <ul className="nav-links">
        <li>Home</li>
        <li>Features</li>
        <li>About</li>
        <li>Contact</li>
      </ul>

      <Link
        to={destination}
        className="get-started-btn"
      >
        {token
          ? "Go to Dashboard"
          : "Get Started"}
      </Link>

    </nav>
  );
}

export default Navbar;