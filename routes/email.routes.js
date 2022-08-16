const express = require("express");
const router = express.Router();

const { validateEmail } = require("../controllers/email.controller");

router.get("/validate", validateEmail);

module.exports = router;
