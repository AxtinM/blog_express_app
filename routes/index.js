const express = require("express");
const router = express.Router();
const authRoutes = require("./auth.routes");
const articlesRoutes = require("./articles.routes");

router.use("/auth", authRoutes);
router.use("/articles", articlesRoutes);

module.exports = router;
