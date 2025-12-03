const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/admin");

router.get("/dashboard", auth, admin, (req, res) => {
  res.json({ message: "Welcome Admin! You have full access." });
});

module.exports = router;
