const User = require("../models/users.model");
const jwt = require("jsonwebtoken");

const fs = require("fs");
const path = require("path");

const userInformation = async (id) => {
  const user = await User.findById(id);
  return user;
};

module.exports.signUpController = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    console.log(req.body);
    const isNewUser = User.isThisEmailInUse(email);
    if (isNewUser) {
      const user = await User({
        name,
        username,
        email,
        password,
      });

      user.save();
      return res.status(201).send({
        message: "User created successfully",
      });
    } else {
      return res.status(409).send({
        message: "User already exists",
      });
    }
  } catch (error) {
    console.log("error inside signUpController : ", error.message);
    return res.status(500).send({
      message: "Something went wrong",
    });
  }
};

module.exports.signInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({
        message: "User not found",
      });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).send({
        message: "Password is incorrect",
      });
    }
    let oldTokens = user.tokens || [];

    if (oldTokens.length) {
      oldTokens = oldTokens.filter((token) => {
        const timeDiff = Date.now() - parseInt(token.signedAt) / 1000;
        if (timeDiff < 86400) {
          return token;
        }
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    await User.findByIdAndUpdate(user._id, {
      tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
    });

    return res.status(200).send({
      message: "Logged in successfully",
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
        isAuthor: user.isAuthor,
        isAdmin: user.isAdmin,
        token: token,
      },
    });
  } catch (error) {
    console.log("error inside signInController : ", error.message);
    return res.status(500).send({
      message: "Something went wrong",
    });
  }
};

module.exports.logoutController = async (req, res) => {
  try {
    if (!req.user || !req.token) {
      return res.status(401).send({
        message: "Something went wrong with token auth",
      });
    }
    const user = req.user;

    const newTokens = user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await User.findByIdAndUpdate(user._id, { tokens: newTokens });

    return res.send({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log("error inside logoutController : ", error.message);

    return res.status(500).send({
      message: "Something went wrong",
    });
  }
};

module.exports.updateImageProfile = async (req, res) => {
  try {
    const user = req.user;
    console.log("Request ------------ \n", req.body);

    await User.findByIdAndUpdate(user._id, {
      image: {
        data: fs.readFileSync(
          path.join(__dirname, "../public/images/profile/", req.fileName)
        ),
        contentType: req.fileMime,
      },
    });
    res.status(200).send({
      message: "image uploaded successfully",
      image: `images/profile/${req.fileName}`,
      user: user,
    });
  } catch (err) {
    res.status(400).send({ message: "Unsuccessfull attempt" });
  }
};
