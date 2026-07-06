import { useTransactions } from "../context/TransactionContext";
import AppLayout from "../components/AppLayout";
import { formatCurrency } from "../utils/currencyFormatter";
import "../styles/Analytics.css";

function Analytics() {
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

  const netBalance =
    totalIncome - totalExpense;

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

  const categoryData = Object.entries(
    expenseByCategory
  )
    .map(([category, amount]) => ({
      category,
      amount,
    }))
    .sort(
      (a, b) =>
        b.amount - a.amount
    );

  const highestExpense =
    categoryData.length
      ? Math.max(
          ...categoryData.map(
            (item) => item.amount
          )
        )
      : 0;

  const monthlyData = transactions.reduce(
    (acc, transaction) => {
      if (!transaction.date) {
        return acc;
      }

      const date =
        new Date(transaction.date);

      const monthKey =
        date.toLocaleDateString(
          "en-US",
          {
            month: "short",
            year: "numeric",
          }
        );

      if (!acc[monthKey]) {
        acc[monthKey] = {
          income: 0,
          expense: 0,
        };
      }

      if (
        transaction.type === "Income"
      ) {
        acc[monthKey].income +=
          Number(transaction.amount);
      }

      if (
        transaction.type === "Expense"
      ) {
        acc[monthKey].expense +=
          Number(transaction.amount);
      }

      return acc;
    },
    {}
  );

  const monthlyEntries =
    Object.entries(monthlyData);

  const highestMonthlyAmount =
    monthlyEntries.length
      ? Math.max(
          ...monthlyEntries.flatMap(
            ([, values]) => [
              values.income,
              values.expense,
            ]
          )
        )
      : 0;

  // ==========================
  // Loading State
  // ==========================

  if (loading) {
    return (
      <AppLayout title="Analytics">
        <div className="analytics-page">
          <div className="analytics-status-state">
            <h3>
              Loading analytics...
            </h3>

            <p>
              Preparing your financial insights.
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
      <AppLayout title="Analytics">
        <div className="analytics-page">
          <div className="analytics-status-state analytics-error-state">

            <h3>
              Unable to load analytics
            </h3>

                        <p>{error}</p>

            <button
              type="button"
              className="analytics-retry-btn"
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
    <AppLayout title="Analytics">
      <div className="analytics-page">

        <div className="analytics-summary-grid">

          <div className="analytics-summary-card">
            <span>Total Income</span>

            <h2>
              {formatCurrency(totalIncome)}
            </h2>
          </div>

          <div className="analytics-summary-card">
            <span>Total Expense</span>

            <h2>
              {formatCurrency(totalExpense)}
            </h2>
          </div>

          <div className="analytics-summary-card">
            <span>Net Balance</span>

            <h2
              className={
                netBalance >= 0
                  ? "analytics-positive"
                  : "analytics-negative"
              }
            >
              {formatCurrency(netBalance)}
            </h2>
          </div>

          <div className="analytics-summary-card">
            <span>
              Total Transactions
            </span>

            <h2>
              {transactions.length}
            </h2>
          </div>

        </div>

        <div className="analytics-grid">

          <div className="analytics-card">

            <div className="analytics-card-header">
              <h3>
                Expense by Category
              </h3>

              <span>
                Dynamic breakdown
              </span>
            </div>

            {categoryData.length > 0 ? (

              <div className="category-analysis-list">

                {categoryData.map(
                  (item) => {

                    const percentage =
                      highestExpense === 0
                        ? 0
                        : (
                            item.amount /
                            highestExpense
                          ) * 100;

                    return (
                      <div
                        className="category-analysis-item"
                        key={item.category}
                      >

                        <div className="analysis-label-row">

                          <span>
                            {item.category}
                          </span>

                          <strong>
                            {formatCurrency(
                              item.amount
                            )}
                          </strong>

                        </div>

                        <div className="analysis-progress-track">
                          <div
                            className="analysis-progress-fill"
                            style={{
                              width:
                                `${percentage}%`,
                            }}
                          />
                        </div>

                      </div>
                    );
                  }
                )}

              </div>

            ) : (

              <p className="analytics-empty">
                No expense data available.
              </p>

            )}

          </div>

          <div className="analytics-card">

            <div className="analytics-card-header">
              <h3>
                Income vs Expense
              </h3>

              <span>
                Overall comparison
              </span>
            </div>

            <div className="comparison-section">

              <div className="comparison-item">

                <div className="analysis-label-row">
                  <span>Income</span>

                  <strong>
                    {formatCurrency(
                      totalIncome
                    )}
                  </strong>
                </div>

                <div className="analysis-progress-track">
                  <div
                    className="comparison-fill income-fill"
                    style={{
                      width: `${
                        Math.max(
                          totalIncome,
                          totalExpense
                        ) === 0
                          ? 0
                          : (
                              totalIncome /
                              Math.max(
                                totalIncome,
                                totalExpense
                              )
                            ) * 100
                      }%`,
                    }}
                  />
                </div>

              </div>

              <div className="comparison-item">

                <div className="analysis-label-row">
                  <span>Expense</span>

                  <strong>
                    {formatCurrency(
                      totalExpense
                    )}
                  </strong>
                </div>

                                <div className="analysis-progress-track">
                  <div
                    className="comparison-fill expense-fill"
                    style={{
                      width: `${
                        Math.max(
                          totalIncome,
                          totalExpense
                        ) === 0
                          ? 0
                          : (
                              totalExpense /
                              Math.max(
                                totalIncome,
                                totalExpense
                              )
                            ) * 100
                      }%`,
                    }}
                  />
                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="analytics-card monthly-analysis-card">

          <div className="analytics-card-header">
            <h3>
              Monthly Analysis
            </h3>

            <span>
              Income and expense by month
            </span>
          </div>

          {monthlyEntries.length > 0 ? (

            <div className="monthly-analysis-list">

              {monthlyEntries.map(
                ([month, values]) => (

                  <div
                    className="monthly-analysis-item"
                    key={month}
                  >

                    <div className="monthly-name">
                      {month}
                    </div>

                    <div className="monthly-bars">

                      <div className="monthly-bar-row">

                        <span>Income</span>

                        <div className="monthly-track">
                          <div
                            className="monthly-fill monthly-income"
                            style={{
                              width: `${
                                highestMonthlyAmount ===
                                0
                                  ? 0
                                  : (
                                      values.income /
                                      highestMonthlyAmount
                                    ) * 100
                              }%`,
                            }}
                          />
                        </div>

                        <strong>
                          {formatCurrency(
                            values.income
                          )}
                        </strong>

                      </div>

                      <div className="monthly-bar-row">

                        <span>Expense</span>

                        <div className="monthly-track">
                          <div
                            className="monthly-fill monthly-expense"
                            style={{
                              width: `${
                                highestMonthlyAmount ===
                                0
                                  ? 0
                                  : (
                                      values.expense /
                                      highestMonthlyAmount
                                    ) * 100
                              }%`,
                            }}
                          />
                        </div>

                        <strong>
                          {formatCurrency(
                            values.expense
                          )}
                        </strong>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          ) : (

            <p className="analytics-empty">
              No monthly data available.
            </p>

          )}

        </div>

      </div>
    </AppLayout>
  );
}

export default Analytics;