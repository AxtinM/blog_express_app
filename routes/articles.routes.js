const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { isAuth } = require("../middleware/auth");
const {
  createArticleController,
  getArticlesController,
  getArticleController,
} = require("../controllers/articles.controller");

storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const image_dir = "../public/images";
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
      cb(null, image_name);
    } catch (err) {
      console.log(err);
    }
  },
});

const upload = multer({ storage: storage });

router.post("/create", isAuth, upload.single("file"), createArticleController);
router.get("/article/:id", getArticleController);
router.get("/:num?", getArticlesController);

module.exports = router;
