import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  const token = localStorage.getItem("token");

  const destination = token
    ? "/dashboard"
    : "/register";

  return (
    <section className="hero">

      <div className="hero-left">

        <div className="hero-badge">
          🚀 Smart Personal Finance Tracker
        </div>

        <h1>
          Track Your Finances
          <br />
          Smarter, Faster &
          <span> Simpler</span>
        </h1>

        <p>
          Manage your income, expenses and savings
          with beautiful analytics and secure tracking.
        </p>

        <div className="hero-buttons">

          <Link
            to={destination}
            className="primary-btn"
          >
            {token
              ? "Open Dashboard"
              : "Start Tracking"}
          </Link>

          <button className="secondary-btn">
            Learn More
          </button>

        </div>

        {/* Trust Statistics */}

        <div className="hero-stats">

          <div>
            <h2>10K+</h2>
            <p>Transactions</p>
          </div>

          <div>
            <h2>99%</h2>
            <p>Secure</p>
          </div>

          <div>
            <h2>24/7</h2>
            <p>Support</p>
          </div>

        </div>

      </div>

      <div className="hero-right">

        <div className="dashboard-preview">

          <div className="dashboard-header">
            <h3>Dashboard</h3>
            <span>July 2026</span>
          </div>

          <div className="balance-card">
            <p>Total Balance</p>
            <h2>₹42,500</h2>
          </div>

          <div className="stats">

            <div className="income-card">
              <h4>Income</h4>
              <p>₹55,000</p>
            </div>

            <div className="expense-card">
              <h4>Expense</h4>
              <p>₹12,500</p>
            </div>

          </div>

          <div className="chart">

            <div className="bar small"></div>
            <div className="bar tall"></div>
            <div className="bar medium"></div>
            <div className="bar"></div>
            <div className="bar tall"></div>
            <div className="bar medium"></div>

          </div>

          <div className="recent-transactions">

            <div className="transaction-row">
              <span>Salary</span>

              <strong className="income-text">
                +₹50,000
              </strong>
            </div>

            <div className="transaction-row">
              <span>Food</span>

              <strong className="expense-text">
                -₹450
              </strong>
            </div>

            <div className="transaction-row">
              <span>Netflix</span>

              <strong className="expense-text">
                -₹799
              </strong>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;