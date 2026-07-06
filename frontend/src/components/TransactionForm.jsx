import { useState } from "react";
import "./TransactionForm.css";
import { useTransactions } from "../context/TransactionContext";

function TransactionForm({
  onClose,
  transaction = null,
}) {
  const {
    addTransaction,
    editTransaction,
  } = useTransactions();

  const isEditMode = Boolean(transaction);

const getDefaultTransactionType = () => {
  try {
    const savedSettings =
      localStorage.getItem("finSightSettings");

    if (!savedSettings) {
      return "Expense";
    }

    const parsedSettings =
      JSON.parse(savedSettings);

    return (
      parsedSettings.defaultTransactionType ||
      "Expense"
    );
  } catch (error) {
    console.error(
      "Failed to read default transaction type:",
      error
    );

    return "Expense";
  }
};

const [formData, setFormData] = useState({
  title: transaction?.title || "",
  amount: transaction?.amount || "",
  category: transaction?.category || "Food",

  type:
    transaction?.type ||
    getDefaultTransactionType(),

  date: transaction?.date
    ? new Date(transaction.date)
        .toISOString()
        .split("T")[0]
    : "",

  notes: transaction?.notes || "",
});

  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSubmitting(true);

      if (isEditMode) {
        const id =
          transaction._id || transaction.id;

        await editTransaction(
          id,
          formData
        );

        alert(
          "Transaction Updated Successfully!"
        );
      } else {
        await addTransaction(formData);

        alert(
          "Transaction Added Successfully!"
        );
      }

      onClose();
    } catch (error) {
      console.error(
        isEditMode
          ? "Update transaction failed:"
          : "Add transaction failed:",
        error
      );

      alert(
        error.response?.data?.message ||
          (isEditMode
            ? "Failed to update transaction"
            : "Failed to add transaction")
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-overlay">

      <div className="transaction-modal">

        <div className="modal-header">

          <h2>
            {isEditMode
              ? "Edit Transaction"
              : "Add Transaction"}
          </h2>

          <button
            className="close-btn"
            onClick={onClose}
            type="button"
          >
            ✕
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Title</label>

            <input
              type="text"
              name="title"
              placeholder="Salary / Grocery..."
              value={formData.title}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>Amount</label>

            <input
              type="number"
              name="amount"
              placeholder="5000"
              value={formData.amount}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />

          </div>

          <div className="row">

            <div className="form-group">

              <label>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option>Food</option>
                <option>Travel</option>
                <option>Shopping</option>
                <option>Entertainment</option>
                <option>Bills</option>
                <option>Salary</option>
                <option>Job</option>
                <option>Other</option>
              </select>

            </div>

            <div className="form-group">

              <label>Type</label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option>Expense</option>
                <option>Income</option>
              </select>

            </div>

          </div>

          <div className="form-group">

            <label>Date</label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label>Notes</label>

            <textarea
              rows="4"
              name="notes"
              placeholder="Optional notes..."
              value={formData.notes}
              onChange={handleChange}
            />

          </div>

          <button
            className="save-btn"
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? isEditMode
                ? "Updating..."
                : "Saving..."
              : isEditMode
                ? "Update Transaction"
                : "Save Transaction"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default TransactionForm;