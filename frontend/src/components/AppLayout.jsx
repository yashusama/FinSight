import { useState } from "react";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import "../styles/Dashboard.css";
import TransactionForm from "./TransactionForm";

function AppLayout({ title, children }) {
  const [showModal, setShowModal] =
    useState(false);

  const navigate = useNavigate();

  let user = null;

  try {
    const savedUser =
      localStorage.getItem("user");

    user = savedUser
      ? JSON.parse(savedUser)
      : null;
  } catch (error) {
    console.error(
      "Failed to read user data:",
      error
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", {
      replace: true,
    });
  };

  const currentMonth = new Date()
    .toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

  return (
    <div className="dashboard">

      {/* Sidebar */}

      <aside className="sidebar">

        <Link
          to="/"
          className="logo app-logo-link"
        >
          <h2>FinSight</h2>
        </Link>

        <nav>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Transactions
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Analytics
          </NavLink>

          <NavLink
            to="/categories"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Categories
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Settings
          </NavLink>

        </nav>

      </aside>

      {/* Main Content */}

      <main className="main-content">

        {/* Top Bar */}

        <header className="topbar">

          <div>
            <h1>{title}</h1>

            <p>
              Welcome back,{" "}
              {user?.name || "User"} 👋
            </p>
          </div>

          <div className="profile">

            <button
              className="add-btn"
              onClick={() =>
                setShowModal(true)
              }
            >
              + Add Transaction
            </button>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

            <span>{currentMonth}</span>

          </div>

        </header>

        {children}

        {showModal && (
          <TransactionForm
            onClose={() =>
              setShowModal(false)
            }
          />
        )}

      </main>

    </div>
  );
}

export default AppLayout;