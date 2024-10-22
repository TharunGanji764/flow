const { Transaction, Category } = require("../models/transaction");

const addTransaction = async (req, res) => {
  const { type, category, amount, description } = req.body;
  try {
    const newTransaction = new Transaction({
      type,
      category,
      amount,
      description,
    });
    await newTransaction.save();
    res
      .status(201)
      .json({ Message: "Transaction added successfully", newTransaction });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTranasactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({});
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findById(id);
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      res.status(404).json({ message: "Transaction not found" });
    }
    transaction.type = req.body.type || transaction.type;
    transaction.category = req.body.category || transaction.category;
    transaction.amount = req.body.amount || transaction.amount;
    transaction.description = req.body.description || transaction.description;
    await transaction.save();
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      res.status(404).json({ message: "Transaction not found" });
    }
    await transaction.deleteOne({ _id: id });
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const summary = async (req, res) => {
  try {
    const transactionsSummary = await Transaction.find({});
    const totalIncome = transactionsSummary
      .filter((transaction) => transaction.type === "income")
      .reduce((total, transaction) => total + transaction.amount, 0);
    const totalExpense = transactionsSummary
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => total + transaction.amount, 0);
    const balance = totalIncome - totalExpense;
    res.status(200).json({ totalIncome, totalExpense, balance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  addTransaction,
  getTranasactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  summary,
};
