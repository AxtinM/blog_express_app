const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  isAuthor: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  tokens: [{ type: Object }],
  articles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
  date_created: {
    type: Date,
    default: Date.now,
  },
  date_updated: [
    {
      type: Date,
      default: Date.now,
    },
  ],
  image: {
    type: Object,
  },
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next();
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error("Password is missing, can not compare!");
  try {
    // console.log("pass ", this.password);
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    console.log("Error comparing password! " + error.message);
  }
};

userSchema.statics.isThisEmailInUse = async function (email) {
  if (!email) throw new Error("Please provide an email address");
  const user = await this.findOne({ email });
  if (!user) return true;
  return false;
};

module.exports = model("User", userSchema);
