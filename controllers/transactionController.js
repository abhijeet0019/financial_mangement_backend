const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");


exports.createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      userId: req.user.id
    });

    res.status(201).json({
      message: "Transaction created",
      transaction
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};


exports.getTransactions = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    let filter = { userId: req.user.id };

    if (type) filter.type = type;
    if (category) filter.category = category;

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const transactions = await Transaction.find(filter);

    if (transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found" });
    }

    res.json(transactions);

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};


exports.getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id
    });

    const income = transactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    res.json({
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};


exports.updateTransaction = async (req, res) => {
  try {
   
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }

    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({
      message: "Transaction updated",
      transaction
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};


exports.deleteTransaction = async (req, res) => {
  try {
    
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }

    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted" });

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};


exports.getCategorySummary = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user.id)
        }
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ]);

    res.json(result);

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};


exports.getRecentTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id })
      .sort({ date: -1 })
      .limit(5);

    res.json(transactions);

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};


exports.getMonthlyTrends = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.user.id)
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          total: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    res.json(result);

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};