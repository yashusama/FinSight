import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getTransactions,
  createTransaction,
  updateTransaction as updateTransactionService,
  deleteTransaction as deleteTransactionService,
} from "../services/transactionService";

const TransactionContext = createContext();

export function TransactionProvider({
  children,
}) {
  const [transactions, setTransactions] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      setTransactions([]);
      setLoading(false);
      setError("");

      return;
    }

    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const token =
      localStorage.getItem("token");

    if (!token) {
      setTransactions([]);
      setLoading(false);
      setError("");

      return;
    }

    try {
      setLoading(true);
      setError("");

      const data =
        await getTransactions();

      setTransactions(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Failed to fetch transactions:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load transactions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function addTransaction(
    transactionData
  ) {
    try {
      const response =
        await createTransaction(
          transactionData
        );

      setTransactions((prev) => [
        response.transaction,
        ...prev,
      ]);

      return response.transaction;
    } catch (error) {
      console.error(
        "Failed to add transaction:",
        error
      );

      throw error;
    }
  }

  async function editTransaction(
    id,
    transactionData
  ) {
    try {
      const response =
        await updateTransactionService(
          id,
          transactionData
        );

      setTransactions((prev) =>
        prev.map((transaction) =>
          (transaction._id ||
            transaction.id) === id
            ? response.transaction
            : transaction
        )
      );

      return response.transaction;
    } catch (error) {
      console.error(
        "Failed to update transaction:",
        error
      );

      throw error;
    }
  }

  async function removeTransaction(id) {
    try {
      await deleteTransactionService(id);

      setTransactions((prev) =>
        prev.filter(
          (transaction) =>
            (transaction._id ||
              transaction.id) !== id
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete transaction:",
        error
      );

      throw error;
    }
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        error,
        addTransaction,
        editTransaction,
        removeTransaction,
        refreshTransactions:
          fetchTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionContext);
}