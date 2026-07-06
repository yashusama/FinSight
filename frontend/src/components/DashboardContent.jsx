import { useState } from "react";
import "../styles/Dashboard.css";
import TransactionForm from "./TransactionForm";
import { useTransactions } from "../context/TransactionContext";

function DashboardLayout({ children }) {
  const { transactions } = useTransactions();

  const [showModal, setShowModal] = useState(false);

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalBalance = totalIncome - totalExpense;

  const savingsRate =
    totalIncome === 0
      ? 0
      : Math.round((totalBalance / totalIncome) * 100);

  // ==========================
  // Expense by Category
  // ==========================
  const expenseByCategory = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, transaction) => {
      const category = transaction.category;

      acc[category] =
        (acc[category] || 0) +
        Number(transaction.amount);

      return acc;
    }, {});


  return (
    <div className="dashboard">


      {/* Main Content */}

      <main className="main-content">

        {/* Top Bar */}


        <div className="dashboard-body">

          {/* Summary Cards */}

          <div className="summary-grid">

            <div className="summary-card">
              <h4>Total Balance</h4>
              <h2>₹{totalBalance.toLocaleString()}</h2>
              <span className="positive">
                +12.5% from last month
              </span>
            </div>

            <div className="summary-card">
              <h4>Total Income</h4>
              <h2>₹{totalIncome.toLocaleString()}</h2>
              <span className="positive">
                +18.4%
              </span>
            </div>

            <div className="summary-card">
              <h4>Total Expense</h4>
              <h2>₹{totalExpense.toLocaleString()}</h2>
              <span className="negative">
                -7.6%
              </span>
            </div>

            <div className="summary-card">
              <h4>Savings Rate</h4>
              <h2>{savingsRate}%</h2>
              <span className="positive">
                Excellent
              </span>
            </div>

          </div>

          {/* Charts Section */}

          <div className="dashboard-grid">

            <div className="chart-card">

              <div className="card-header">
                <h3>Monthly Overview</h3>
                <span>Last 6 Months</span>
              </div>

              <div className="chart-area">

                <div className="chart-bars">

                  <div className="chart-group">
                    <div className="income h70"></div>
                    <div className="expense h45"></div>
                    <p>Jan</p>
                  </div>

                  <div className="chart-group">
                    <div className="income h90"></div>
                    <div className="expense h55"></div>
                    <p>Feb</p>
                  </div>

                  <div className="chart-group">
                    <div className="income h110"></div>
                    <div className="expense h65"></div>
                    <p>Mar</p>
                  </div>

                  <div className="chart-group">
                    <div className="income h80"></div>
                    <div className="expense h40"></div>
                    <p>Apr</p>
                  </div>

                  <div className="chart-group">
                    <div className="income h120"></div>
                    <div className="expense h75"></div>
                    <p>May</p>
                  </div>

                  <div className="chart-group">
                    <div className="income h95"></div>
                    <div className="expense h50"></div>
                    <p>Jun</p>
                  </div>

                </div>

              </div>

            </div>

            {/* Dynamic Expenses */}

            <div className="category-card">

              <div className="card-header">
                <h3>Expenses</h3>
              </div>

              {Object.keys(expenseByCategory).length > 0 ? (

                Object.entries(expenseByCategory).map(
                  ([category, amount]) => (

                    <div
                      className="category-item"
                      key={category}
                    >
                      <span>{category}</span>

                      <strong>
                        ₹{amount.toLocaleString()}
                      </strong>

                    </div>

                  )
                )

              ) : (

                <div className="category-item">
                  <span>No Expenses</span>
                  <strong>₹0</strong>
                </div>

              )}

            </div>

          </div>

          {/* Recent Transactions */}

          <div className="transactions-card">

            <div className="card-header">
              <h3>Recent Transactions</h3>
            </div>

            <table>

              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>

                {transactions.length > 0 ? (
                  transactions.map((transaction) => (

                    <tr
                      key={transaction._id || transaction.id}
                    >

                      <td>{transaction.title}</td>

                      <td>{transaction.category}</td>

                      <td>
                        {transaction.date
                          ? new Date(
                              transaction.date
                            ).toLocaleDateString("en-CA")
                          : "-"}
                      </td>

                      <td
                        className={
                          transaction.type === "Income"
                            ? "positive"
                            : "negative"
                        }
                      >
                        {transaction.type === "Income"
                          ? "+"
                          : "-"}
                        ₹
                        {Number(
                          transaction.amount
                        ).toLocaleString()}
                      </td>

                    </tr>

                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      style={{
                        textAlign: "center",
                        padding: "20px",
                      }}
                    >
                      No transactions found
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

        </div>

        {children}

        {showModal && (
          <TransactionForm
            onClose={() => setShowModal(false)}
          />
        )}

      </main>

    </div>
  );
}

export default DashboardLayout;