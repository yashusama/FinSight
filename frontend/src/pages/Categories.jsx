import { useTransactions } from "../context/TransactionContext";
import AppLayout from "../components/AppLayout";
import { formatCurrency } from "../utils/currencyFormatter";
import "../styles/Categories.css";

function Categories() {
  const {
    transactions,
    loading,
    error,
    refreshTransactions,
  } = useTransactions();

  const categoryMap = transactions.reduce(
    (acc, transaction) => {
      const category =
        transaction.category || "Other";

      const amount =
        Number(transaction.amount) || 0;

      if (!acc[category]) {
        acc[category] = {
          name: category,
          income: 0,
          expense: 0,
          count: 0,
        };
      }

      if (transaction.type === "Income") {
        acc[category].income += amount;
      }

      if (transaction.type === "Expense") {
        acc[category].expense += amount;
      }

      acc[category].count += 1;

      return acc;
    },
    {}
  );

  const categories = Object.values(
    categoryMap
  ).sort(
    (a, b) =>
      b.income +
      b.expense -
      (a.income + a.expense)
  );

  const totalCategories =
    categories.length;

  const expenseCategories =
    categories.filter(
      (category) =>
        category.expense > 0
    ).length;

  const incomeCategories =
    categories.filter(
      (category) =>
        category.income > 0
    ).length;

  const totalTrackedAmount =
    categories.reduce(
      (sum, category) =>
        sum +
        category.income +
        category.expense,
      0
    );

  function getCategoryType(category) {
    if (
      category.income > 0 &&
      category.expense > 0
    ) {
      return "Mixed";
    }

    if (category.income > 0) {
      return "Income";
    }

    return "Expense";
  }

  // ==========================
  // Loading State
  // ==========================

  if (loading) {
    return (
      <AppLayout title="Categories">
        <div className="categories-page">

          <div className="categories-status-state">

            <h3>
              Loading categories...
            </h3>

            <p>
              Preparing your category breakdown.
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
      <AppLayout title="Categories">
        <div className="categories-page">

          <div className="categories-status-state categories-error-state">

            <h3>
              Unable to load categories
            </h3>

            <p>{error}</p>

            <button
              type="button"
              className="categories-retry-btn"
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
    <AppLayout title="Categories">
      <div className="categories-page">

        <div className="categories-summary-grid">

          <div className="category-summary-card">
            <span>Total Categories</span>

            <h2>
              {totalCategories}

                          </h2>
          </div>

          <div className="category-summary-card">
            <span>
              Expense Categories
            </span>

            <h2>
              {expenseCategories}
            </h2>
          </div>

          <div className="category-summary-card">
            <span>
              Income Categories
            </span>

            <h2>
              {incomeCategories}
            </h2>
          </div>

          <div className="category-summary-card">
            <span>
              Total Tracked Amount
            </span>

            <h2>
              {formatCurrency(
                totalTrackedAmount
              )}
            </h2>
          </div>

        </div>

        <div className="categories-section">

          <div className="categories-section-header">

            <div>
              <h2>
                Category Overview
              </h2>

              <p>
                Breakdown generated from
                your transactions
              </p>
            </div>

            <span className="category-count-badge">
              {totalCategories} Categories
            </span>

          </div>

          {categories.length > 0 ? (

            <div className="category-cards-grid">

              {categories.map(
                (category) => {

                  const type =
                    getCategoryType(
                      category
                    );

                  return (
                    <div
                      className="category-overview-card"
                      key={category.name}
                    >

                      <div className="category-card-top">

                        <div className="category-icon">
                          {category.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <span
                          className={
                            `category-type-badge ${
                              type.toLowerCase()
                            }-category`
                          }
                        >
                          {type}
                        </span>

                      </div>

                      <h3>
                        {category.name}
                      </h3>

                      <p className="category-transaction-count">
                        {category.count}{" "}
                        {category.count === 1
                          ? "transaction"
                          : "transactions"}
                      </p>

                      <div className="category-values">

                        <div>
                          <span>
                            Income
                          </span>

                          <strong className="category-income-value">
                            {formatCurrency(
                              category.income
                            )}
                          </strong>
                        </div>

                        <div>
                          <span>
                            Expense
                          </span>

                          <strong className="category-expense-value">
                            {formatCurrency(
                              category.expense
                            )}
                          </strong>
                        </div>

                      </div>

                      <div className="category-total-row">

                        <span>
                          Total Activity
                        </span>

                        <strong>
                          {formatCurrency(
                            category.income +
                            category.expense
                          )}
                        </strong>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          ) : (

            <div className="categories-empty-state">

              <h3>
                No Categories Yet
              </h3>

              <p>
                Add your first transaction
                to generate category
                analytics.
              </p>

            </div>

          )}

        </div>

      </div>
    </AppLayout>
  );
}

export default Categories;