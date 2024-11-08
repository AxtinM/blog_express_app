const Articles = require("../models/articles.model");

module.exports.createArticleController = async (req, res) => {
  try {
    const { title, content } = req.body;
    const file = req.file;
    const user = req.user;

    console.log(req);
    const path = file.path.split("/");
    delete file.destination;
    file.path = path.slice(path.indexOf("images")).join("/");

    const article = new Articles({
      title,
      content,
      author: user._id,
      imageHeadline: file,
    });

    console.log("article");

    user.articles.push(article._id);

    console.log(article);

    await article.save();
    await user.save();

    return res.status(200).send({
      message: "Article created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something went wrong",
    });
  }
};

module.exports.getArticlesController = async (req, res) => {
  try {
    let num;
    if (req.params.num == undefined) {
      num = 1;
    } else {
      if (isNaN(req.params.num)) {
        return res.status(409).send({
          message: "Invalid Url",
        });
      }
      num = parseInt(req.params.num);
    }
    const articles = await Articles.find({})
      .sort("-date_created")
      .skip(5 * (num - 1))
      .limit(5 * num)
      .populate("author", "name username _id");

    return res.json({
      articles,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Something went wrong",
    });
  }
};

module.exports.getArticleController = async (req, res) => {
  try {
    const article = await Articles.findById(req.params.id)
      .populate("author", "name username _id")
      .populate("comments.author", "name username _id");

    return res.status(200).send({
      article,
    });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};

module.exports.getFeaturedArticlesController = async (req, res) => {
  try {
    const articles = await Articles.find({ featured: true })
      .sort("-date_created")
      .limit(5)
      .populate("author", "username _id");

    return res.status(200).send({
      articles,
    });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong" });
  }
};
