const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const {
  // ensureAuthenticated,
  signInController,
  signUpController,
  logoutController,
  updateImageProfile,
} = require("../controllers/auth.controller");

const { sendEmail } = require("../controllers/email.controller");

storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const image_dir = "../public/images/profile";
    cb(null, path.join(__dirname, image_dir));
  },
  filename: function (req, file, cb) {
    try {
      const code = Date.now() + "-" + Math.floor(Math.random() * 1e9);
      const mime = file.mimetype.split("/");
      console.log(mime);
      if (mime[0] !== "image" || mime.length > 2) throw Error("wrong MimeType");
      const image_name = file.fieldname + "-" + code + "." + mime[1];
      req.fileName = image_name;
      req.fileMime = file.mimetype;
      cb(null, image_name);
    } catch (err) {
      console.log(err);
    }
  },
});

const upload = multer({ storage: storage });

router.post("/register", signUpController, sendEmail);
router.post("/login", signInController);
router.post("/logout", isAuth, logoutController);
router.post("/update_image", isAuth, upload.single("file"), updateImageProfile);

module.exports = router;
