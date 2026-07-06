const express = require("express");
const router = express.Router();

const {
    addTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
} = require("../controllers/transactionController");

const authMiddleware = require("../middlewares/authMiddleware");

// Create
router.post("/", authMiddleware, addTransaction);

// Read
router.get("/", authMiddleware, getTransactions);

// Update
router.put("/:id", authMiddleware, updateTransaction);

// Delete
router.delete("/:id", authMiddleware, deleteTransaction);

module.exports = router;