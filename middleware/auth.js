const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

exports.isAuth = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decode.userId);
      if (!user) {
        return res.json({ success: false, message: "unauthorized access!" });
      }
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.status(401).send({
          success: false,
          message: "unauthorized access! : JsonWebTokenError",
        });
      }
      if (error.name === "TokenExpiredError") {
        return res.status(401).send({
          success: false,
          message: "session expired try sign in!",
        });
      }

      res
        .status(500)
        .send({ success: false, message: "Internal server error!" });
    }
  } else {
    // console.log(req.headers.authorization);
    res.status(403).send({ success: false, message: "unauthorized access!" });
  }
};
