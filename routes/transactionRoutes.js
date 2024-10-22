const transactionController = require("../controllers/transactionController");

const express = require("express");
const router = express.Router();

router.post("/transaction", transactionController.addTransaction);
router.get("/tranasactions", transactionController.getTranasactions);
router.get("/transactions/:id", transactionController.getTransaction);
router.put("/transactions/:id", transactionController.updateTransaction);
router.delete("/transactions/:id", transactionController.deleteTransaction);
router.get("/summary", transactionController.summary);
module.exports = router;
