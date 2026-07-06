const Transaction = require("../models/Transaction");

// ======================
// Add Transaction
// ======================
const addTransaction = async (req, res) => {
    try {
        const {
    title,
    amount,
    type,
    category,
    notes,
    date,
} = req.body;

        if (!title || !amount || !type || !category) {
            return res.status(400).json({
                message: "Please fill all required fields",
            });
        }

        const transaction = await Transaction.create({
    user: req.user.id,
    title,
    amount,
    type,
    category,
    notes,
    date,
});

        res.status(201).json({
            message: "Transaction Added Successfully",
            transaction,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// ======================
// Get Transactions
// ======================
const getTransactions = async (req, res) => {
    try {

        const transactions = await Transaction.find({
            user: req.user.id,
        }).sort({ date: -1 });

        res.status(200).json(transactions);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};

// ======================
// Update Transaction
// ======================
const updateTransaction = async (req, res) => {
    try {

        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }

        // Security Check
        if (transaction.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not Authorized",
            });
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );

        res.status(200).json({
            message: "Transaction Updated Successfully",
            transaction: updatedTransaction,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};

// ======================
// Delete Transaction
// ======================
const deleteTransaction = async (req, res) => {
    try {

        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }

        // Security Check
        if (transaction.user.toString() !== req.user.id) {
            return res.status(401).json({
                message: "Not Authorized",
            });
        }

        await Transaction.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Transaction Deleted Successfully",
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};

module.exports = {
    addTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
};