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

app.set("port", process.env.PORT || 8000);
app.use("/api", indexRoutes);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
}

app.get("/*", (req, res) => {
  console.log("----------------------------------------------------");
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(app.get("port"), () => {
  console.log(`Server is running on port ${app.get("port")}`);
});
