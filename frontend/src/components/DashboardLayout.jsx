import "../styles/Dashboard.css";
import { useTransactions } from "../context/TransactionContext";
import { formatCurrency } from "../utils/currencyFormatter";

function DashboardLayout() {
  const {
    transactions,
    loading,
    error,
    refreshTransactions,
  } = useTransactions();

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

  const totalBalance =
    totalIncome - totalExpense;

  const savingsRate =
    totalIncome === 0
      ? 0
      : Math.round(
          (totalBalance / totalIncome) * 100
        );

  // ==========================
  // Summary Status Labels
  // ==========================

  const balanceStatus =
    totalBalance > 0
      ? {
          text: "Positive balance",
          className: "positive",
        }
      : totalBalance < 0
        ? {
            text: "Negative balance",
            className: "negative",
          }
        : {
            text: "Balanced",
            className: "neutral",
          };

  const incomeStatus =
    totalIncome > 0
      ? {
          text: "Income recorded",
          className: "positive",
        }
      : {
          text: "No income recorded",
          className: "neutral",
        };

  const expenseStatus =
    totalExpense > 0
      ? {
          text: "Expenses recorded",
          className: "negative",
        }
      : {
          text: "No expenses recorded",
          className: "neutral",
        };

  const savingsStatus =
    totalIncome === 0
      ? {
          text: "No income recorded",
          className: "neutral",
        }
      : savingsRate > 20
        ? {
            text: "Strong savings",
            className: "positive",
          }
        : savingsRate >= 0
          ? {
              text: "Low savings",
              className: "neutral",
            }
          : {
              text: "Negative savings",
              className: "negative",
            };

  // ==========================
  // Expense by Category
  // ==========================

  const expenseByCategory = transactions
    .filter(
      (transaction) =>
        transaction.type === "Expense"
    )
    .reduce((acc, transaction) => {
      const category =
        transaction.category || "Other";

      acc[category] =
        (acc[category] || 0) +
        Number(transaction.amount);

      return acc;
    }, {});

  const sortedExpenseCategories =
    Object.entries(expenseByCategory).sort(
      ([, amountA], [, amountB]) =>
        amountB - amountA
    );

  // ==========================
  // Dynamic Last 6 Months
  // ==========================

  const currentDate = new Date();

  const lastSixMonths = Array.from(
    { length: 6 },
    (_, index) => {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - (5 - index),
        1
      );

      return {
        key:
          `${date.getFullYear()}-` +
          `${date.getMonth()}`,
        label: date.toLocaleDateString(
          "en-US",
          {
            month: "short",
          }
        ),
        income: 0,
        expense: 0,
      };
    }
  );

    transactions.forEach((transaction) => {
    if (!transaction.date) {
      return;
    }

    const transactionDate = new Date(
      transaction.date
    );

    if (
      Number.isNaN(
        transactionDate.getTime()
      )
    ) {
      return;
    }

    const monthKey =
      `${transactionDate.getFullYear()}-` +
      `${transactionDate.getMonth()}`;

    const monthData = lastSixMonths.find(
      (month) => month.key === monthKey
    );

    if (!monthData) {
      return;
    }

    const amount =
      Number(transaction.amount) || 0;

    if (transaction.type === "Income") {
      monthData.income += amount;
    }

    if (transaction.type === "Expense") {
      monthData.expense += amount;
    }
  });

  const highestChartAmount = Math.max(
    0,
    ...lastSixMonths.flatMap((month) => [
      month.income,
      month.expense,
    ])
  );

  function getBarHeight(amount) {
    if (
      amount <= 0 ||
      highestChartAmount === 0
    ) {
      return 0;
    }

    const calculatedHeight =
      (amount / highestChartAmount) * 150;

    return Math.max(
      calculatedHeight,
      12
    );
  }

  // ==========================
  // Latest 5 Transactions
  // ==========================

  const recentTransactions = [
    ...transactions,
  ]
    .sort(
      (
        transactionA,
        transactionB
      ) => {
        const dateA = transactionA.date
          ? new Date(
              transactionA.date
            ).getTime()
          : 0;

        const dateB = transactionB.date
          ? new Date(
              transactionB.date
            ).getTime()
          : 0;

        return dateB - dateA;
      }
    )
    .slice(0, 5);

  // ==========================
  // Loading State
  // ==========================

  if (loading) {
    return (
      <div className="dashboard-body">
        <div className="dashboard-status-state">
          <h3>
            Loading dashboard...
          </h3>

          <p>
            Fetching your latest financial data.
          </p>
        </div>
      </div>
    );
  }

  // ==========================
  // Error State
  // ==========================

  if (error) {
    return (
      <div className="dashboard-body">
        <div className="dashboard-status-state dashboard-error-state">

          <h3>
            Unable to load dashboard
          </h3>

          <p>{error}</p>

          <button
            type="button"
            className="dashboard-retry-btn"
            onClick={refreshTransactions}
          >
            Try Again
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-body">

      {/* Summary Cards */}

      <div className="summary-grid">

        <div className="summary-card">
          <h4>Total Balance</h4>

          <h2>
            {formatCurrency(
              totalBalance
            )}
          </h2>

          <span
            className={
              balanceStatus.className
            }
          >
            {balanceStatus.text}
          </span>
        </div>

        <div className="summary-card">
          <h4>Total Income</h4>

          <h2>
            {formatCurrency(
              totalIncome
            )}
          </h2>

          <span
            className={
              incomeStatus.className
            }
          >
            {incomeStatus.text}
          </span>
        </div>

        <div className="summary-card">
          <h4>Total Expense</h4>

          <h2>
            {formatCurrency(
              totalExpense
            )}
          </h2>

          <span
            className={
              expenseStatus.className
            }
          >
            {expenseStatus.text}
          </span>
        </div>

        <div className="summary-card">
          <h4>Savings Rate</h4>

          <h2>{savingsRate}%</h2>

          <span
            className={
              savingsStatus.className
            }
          >
            {savingsStatus.text}
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

          <div className="chart-legend">

            <div className="legend-item">
              <span className="legend-dot income-dot" />
              Income
            </div>

            <div className="legend-item">
              <span className="legend-dot expense-dot" />
              Expense
            </div>

          </div>

          <div className="chart-area">

            <div className="chart-bars">

              {lastSixMonths.map((month) => (
                <div
                  className="chart-group"
                  key={month.key}
                >

                  <div className="chart-values">

                    <div
                      className="income dynamic-bar"
                      style={{
                        height: `${getBarHeight(
                          month.income
                        )}px`,
                      }}
                      title={`Income: ${formatCurrency(
                        month.income
                      )}`}
                    />

                    <div
                      className="expense dynamic-bar"
                      style={{
                        height: `${getBarHeight(
                          month.expense
                        )}px`,
                      }}
                      title={`Expense: ${formatCurrency(
                        month.expense
                      )}`}
                    />

                  </div>

                  <p>{month.label}</p>

                </div>
              ))}

            </div>

          </div>

        </div>

        {/* Dynamic Expenses */}

        <div className="category-card">

          <div className="card-header">
            <h3>Expenses</h3>
          </div>

          {sortedExpenseCategories.length >
          0 ? (

            sortedExpenseCategories.map(
              ([category, amount]) => (

                <div
                  className="category-item"
                  key={category}
                >
                  <span>
                    {category}
                  </span>

                  <strong>
                    {formatCurrency(
                      amount
                    )}
                  </strong>
                </div>

              )
            )

          ) : (

            <div className="category-item">
              <span>No Expenses</span>

              <strong>
                {formatCurrency(0)}
              </strong>
            </div>

          )}

        </div>

      </div>

      {/* Recent Transactions */}

      <div className="transactions-card">

        <div className="card-header">
          <h3>
            Recent Transactions
          </h3>

          <span>Latest 5</span>
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

            {recentTransactions.length >
            0 ? (

              recentTransactions.map(
                (transaction) => (

                  <tr
                    key={
                      transaction._id ||
                      transaction.id
                    }
                  >

                    <td>
                      {transaction.title}
                    </td>

                    <td>
                      {transaction.category}
                    </td>

                    <td>
                      {transaction.date
                        ? new Date(
                            transaction.date
                          ).toLocaleDateString(
                            "en-CA"
                          )
                        : "-"}
                    </td>

                    <td
                      className={
                        transaction.type ===
                        "Income"
                          ? "positive"
                          : "negative"
                      }
                    >
                      {transaction.type ===
                      "Income"
                        ? "+"
                        : "-"}

                      {formatCurrency(
                        Math.abs(
                          Number(
                            transaction.amount
                          )
                        )
                      )}
                    </td>

                  </tr>

                )
              )

            ) : (

              <tr>
                <td
                  colSpan="4"
                  className="dashboard-empty-row"
                >
                  No transactions found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DashboardLayout;