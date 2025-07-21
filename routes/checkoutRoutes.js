// routes/checkoutRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const { createCheckoutSession } = require("../controllers/checkoutController");

router.post("/", protect, createCheckoutSession);

module.exports = router;
