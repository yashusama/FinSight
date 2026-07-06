import "./Features.css";

import {
  FaChartPie,
  FaWallet,
  FaChartLine,
  FaShieldAlt,
  FaBolt,
  FaMobileAlt,
} from "react-icons/fa";

function Features() {
  return (
    <section className="features">
      <h2>Why Choose FinSight?</h2>

      <p className="features-subtitle">
        Everything you need to manage your finances
        in one secure platform.
      </p>

      <div className="features-grid">

        <div className="feature-card">
          <div className="feature-icon">
            <FaChartPie />
          </div>

          <h3>Smart Dashboard</h3>

          <p>
            View your balance, income and expenses
            in one place.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FaWallet />
          </div>

          <h3>Track Transactions</h3>

          <p>
            Easily add, edit and delete your
            daily transactions.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FaChartLine />
          </div>

          <h3>Analytics</h3>

          <p>
            Understand your spending through
            visual reports.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FaShieldAlt />
          </div>

          <h3>Secure Login</h3>

          <p>
            JWT authentication keeps your
            account protected.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FaBolt />
          </div>

          <h3>Fast Performance</h3>

          <p>
            Built with the MERN Stack for
            excellent performance.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <FaMobileAlt />
          </div>

          <h3>Responsive Design</h3>

          <p>
            Works beautifully across desktop,
            tablet and mobile devices.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Features;