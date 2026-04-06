const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");


router.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Profile accessed",
    user: req.user
  });
});


router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.json({
    message: "Admin access granted"
  });
});

module.exports = router;