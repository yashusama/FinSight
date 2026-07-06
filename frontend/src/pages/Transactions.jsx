import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";
import AppLayout from "../components/AppLayout";
import TransactionForm from "../components/TransactionForm";
import { formatCurrency } from "../utils/currencyFormatter";
import "../styles/Transactions.css";

function Transactions() {
  const {
    transactions,
    removeTransaction,
    loading,
    error,
    refreshTransactions,
  } = useTransactions();

  const [deletingId, setDeletingId] =
    useState(null);

  const [
    editingTransaction,
    setEditingTransaction,
  ] = useState(null);

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleCloseEdit = () => {
    setEditingTransaction(null);
  };

  const handleDelete = async (
    transaction
  ) => {
    const id =
      transaction._id || transaction.id;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${transaction.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await removeTransaction(id);

      alert(
        "Transaction deleted successfully"
      );
    } catch (error) {
      console.error(
        "Delete transaction failed:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete transaction"
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AppLayout title="Transactions">
      <div className="transactions-page">

        <div className="transactions-header">

          <h2>All Transactions</h2>

          <p>
            Total Transactions:{" "}
            <strong>
              {loading
                ? "..."
                : transactions.length}
            </strong>
          </p>

        </div>

        <div className="transactions-table-container">

          <table className="transactions-table">

            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Type</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td
                    colSpan="6"
                    className="no-data"
                  >
                    Loading transactions...
                  </td>
                </tr>

              ) : error ? (

                <tr>
                  <td
                    colSpan="6"
                    className="no-data"
                  >
                    <div className="transactions-error-state">

                      <p>{error}</p>

                      <button
                        type="button"
                        className="retry-transactions-btn"
                        onClick={
                          refreshTransactions
                        }
                      >
                        Try Again
                      </button>

                    </div>
                  </td>
                </tr>

              ) : transactions.length > 0 ? (

                transactions.map(
                  (transaction) => {

                    const id =
                      transaction._id ||
                      transaction.id;

                    return (
                      <tr key={id}>

                        <td>
                          {transaction.title}
                        </td>

                                                <td>
                          {transaction.category}
                        </td>

                        <td>
                          <span
                            className={
                              transaction.type ===
                              "Income"
                                ? "income-badge"
                                : "expense-badge"
                            }
                          >
                            {transaction.type}
                          </span>
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
                              ? "income-text"
                              : "expense-text"
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

                        <td>
                          <div className="transaction-actions">

                            <button
                              className="edit-transaction-btn"
                              onClick={() =>
                                handleEdit(
                                  transaction
                                )
                              }
                              disabled={
                                deletingId === id
                              }
                            >
                              Edit
                            </button>

                            <button
                              className="delete-transaction-btn"
                              onClick={() =>
                                handleDelete(
                                  transaction
                                )
                              }
                              disabled={
                                deletingId === id
                              }
                            >
                              {deletingId === id
                                ? "Deleting..."
                                : "Delete"}
                            </button>

                          </div>
                        </td>

                      </tr>
                    );
                  }
                )

              ) : (

                <tr>
                  <td
                    colSpan="6"
                    className="no-data"
                  >
                    No Transactions Found
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {editingTransaction && (
        <TransactionForm
          transaction={
            editingTransaction
          }
          onClose={handleCloseEdit}
        />
      )}

    </AppLayout>
  );
}

export default Transactions;