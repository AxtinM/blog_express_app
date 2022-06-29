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
// app.use(cors());
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("port", process.env.PORT || 8000);

app.use(express.static(path.resolve(__dirname, "client", "build")));

app.use("/api", indexRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
