import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL;

export const getTransactions = async () => {
  const token =
    localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/transactions`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};

export const createTransaction = async (
  transactionData
) => {
  const token =
    localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/transactions`,
    transactionData,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};

export const updateTransaction = async (
  id,
  transactionData
) => {
  const token =
    localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/transactions/${id}`,
    transactionData,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};

export const deleteTransaction = async (
  id
) => {
  const token =
    localStorage.getItem("token");

  const response = await axios.delete(
    `${API_URL}/transactions/${id}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};