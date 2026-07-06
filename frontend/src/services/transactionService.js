import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

const API_URL =
  `${API_BASE_URL}/transactions`;

export const getTransactions = async () => {
  const token =
    localStorage.getItem("token");

  const response = await axios.get(
    API_URL,
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
    API_URL,
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
    `${API_URL}/${id}`,
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
    `${API_URL}/${id}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};