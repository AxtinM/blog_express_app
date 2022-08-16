const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const articlesRoutes = require("./articles.routes");
const emailRoutes = require("./email.routes");

router.use("/auth", authRoutes);
router.use("/email", emailRoutes);
router.use("/articles", articlesRoutes);

module.exports = router;
