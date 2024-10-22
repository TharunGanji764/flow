const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
  description: { type: String },
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
const Category = mongoose.model("Category", CategorySchema);

module.exports = { Transaction, Category };
