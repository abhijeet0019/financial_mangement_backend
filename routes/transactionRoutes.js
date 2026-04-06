const express = require("express");
const authorizeRoles = require("../middleware/roleMiddleware");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const validateTransaction = require("../middleware/validateTransaction");

const {
  createTransaction,
  getTransactions,
  getSummary,
  updateTransaction,
  deleteTransaction,
  getCategorySummary,
  getRecentTransactions,
  getMonthlyTrends
} = require("../controllers/transactionController");


router.post(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  validateTransaction,
  createTransaction
);


router.get("/", verifyToken, getTransactions);


router.get(
  "/summary",
  verifyToken,
  authorizeRoles("analyst", "admin"),
  getSummary
);


router.get(
  "/category-summary",
  verifyToken,
  authorizeRoles("analyst", "admin"),
  getCategorySummary
);


router.get(
  "/monthly",
  verifyToken,
  authorizeRoles("analyst", "admin"),
  getMonthlyTrends
);


router.get("/recent", verifyToken, getRecentTransactions);


router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  updateTransaction
);


router.delete(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  deleteTransaction
);

module.exports = router;