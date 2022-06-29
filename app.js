let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const indexRoutes = require("./routes/index");
let app = express();

// database connection
require("./models/db");

// setup cors
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRoutes);

app.listen(8000, function () {
  console.log("Server running on port 8000");
});
