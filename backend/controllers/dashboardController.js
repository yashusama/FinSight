const Transaction = require("../models/Transaction");

// ======================
// Dashboard Summary
// ======================
const getDashboard = async (req, res) => {
    try {

        const transactions = await Transaction.find({
            user: req.user.id,
        }).sort({ date: -1 });

        const totalIncome = transactions
            .filter(t => t.type === "Income")
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpense = transactions
            .filter(t => t.type === "Expense")
            .reduce((sum, t) => sum + t.amount, 0);

        const balance = totalIncome - totalExpense;

        const recentTransactions = transactions.slice(0, 5);

        res.status(200).json({
            totalIncome,
            totalExpense,
            balance,
            recentTransactions,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });

    }
};

module.exports = {
    getDashboard,
};