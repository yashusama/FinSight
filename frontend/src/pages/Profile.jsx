import { useState } from "react";
import AppLayout from "../components/AppLayout";
import { useTransactions } from "../context/TransactionContext";
import { formatCurrency } from "../utils/currencyFormatter";
import "../styles/Profile.css";

function Profile() {
  const {
    transactions,
    loading,
    error,
    refreshTransactions,
  } = useTransactions();

  const [user] = useState(() => {
    try {
      const savedUser =
        localStorage.getItem("user");

      return savedUser
        ? JSON.parse(savedUser)
        : null;
    } catch (error) {
      console.error(
        "Failed to read user data:",
        error
      );

      return null;
    }
  });

  const totalIncome = transactions
    .filter(
      (transaction) =>
        transaction.type === "Income"
    )
    .reduce(
      (sum, transaction) =>
        sum + Number(transaction.amount),
      0
    );

  const totalExpense = transactions
    .filter(
      (transaction) =>
        transaction.type === "Expense"
    )
    .reduce(
      (sum, transaction) =>
        sum + Number(transaction.amount),
      0
    );

  const netBalance =
    totalIncome - totalExpense;

  const userInitial =
    user?.name
      ?.charAt(0)
      .toUpperCase() || "U";

  // ==========================
  // Loading State
  // ==========================

  if (loading) {
    return (
      <AppLayout title="Profile">
        <div className="profile-page">

          <div className="profile-status-state">

            <h3>
              Loading profile...
            </h3>

            <p>
              Fetching your latest financial data.
            </p>

          </div>

        </div>
      </AppLayout>
    );
  }

  // ==========================
  // Error State
  // ==========================

  if (error) {
    return (
      <AppLayout title="Profile">
        <div className="profile-page">

          <div className="profile-status-state profile-error-state">

            <h3>
              Unable to load profile data
            </h3>

            <p>{error}</p>

            <button
              type="button"
              className="profile-retry-btn"
              onClick={refreshTransactions}
            >
              Try Again
            </button>

          </div>

        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Profile">
      <div className="profile-page">

        <div className="profile-hero-card">

          <div className="profile-avatar">
            {userInitial}
          </div>

          <div className="profile-hero-info">

            <h2>
              {user?.name || "FinSight User"}
            </h2>

            <p>
              {user?.email ||
                "No email available"}
            </p>

            <span className="profile-status">
              Active Account
            </span>

          </div>

        </div>

        <div className="profile-stats-grid">

          <div className="profile-stat-card">

            <span>
              Total Transactions
            </span>

            <h2>
              {transactions.length}
            </h2>

          </div>

                    <div className="profile-stat-card">

            <span>
              Total Income
            </span>

            <h2 className="profile-income">
              {formatCurrency(
                totalIncome
              )}
            </h2>

          </div>

          <div className="profile-stat-card">

            <span>
              Total Expense
            </span>

            <h2 className="profile-expense">
              {formatCurrency(
                totalExpense
              )}
            </h2>

          </div>

          <div className="profile-stat-card">

            <span>
              Net Balance
            </span>

            <h2
              className={
                netBalance >= 0
                  ? "profile-income"
                  : "profile-expense"
              }
            >
              {formatCurrency(
                netBalance
              )}
            </h2>

          </div>

        </div>

        <div className="profile-details-grid">

          <div className="profile-details-card">

            <div className="profile-card-header">

              <h3>
                Personal Information
              </h3>

              <span>
                Account details
              </span>

            </div>

            <div className="profile-info-list">

              <div className="profile-info-row">

                <span>
                  Full Name
                </span>

                <strong>
                  {user?.name ||
                    "Not Available"}
                </strong>

              </div>

              <div className="profile-info-row">

                <span>
                  Email Address
                </span>

                <strong>
                  {user?.email ||
                    "Not Available"}
                </strong>

              </div>

              <div className="profile-info-row">

                <span>
                  Account ID
                </span>

                <strong className="profile-user-id">
                  {user?._id ||
                    "Not Available"}
                </strong>

              </div>

            </div>

          </div>

          <div className="profile-details-card">

            <div className="profile-card-header">

              <h3>
                Financial Overview
              </h3>

              <span>
                Live transaction data
              </span>

            </div>

            <div className="profile-info-list">

              <div className="profile-info-row">

                <span>
                  Transactions
                </span>

                <strong>
                  {transactions.length}
                </strong>

              </div>

              <div className="profile-info-row">

                <span>
                  Total Income
                </span>

                <strong className="profile-income">
                  {formatCurrency(
                    totalIncome
                  )}
                </strong>

              </div>

              <div className="profile-info-row">

                <span>
                  Total Expense
                </span>

                <strong className="profile-expense">
                  {formatCurrency(
                    totalExpense
                  )}
                </strong>

              </div>

              <div className="profile-info-row">

                <span>
                  Current Balance
                </span>

                <strong
                  className={
                    netBalance >= 0
                      ? "profile-income"
                      : "profile-expense"
                  }
                >
                  {formatCurrency(
                    netBalance
                  )}
                </strong>

              </div>

            </div>

          </div>

        </div>

      </div>
    </AppLayout>
  );
}

export default Profile;