var crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.validateEmail = (req, res) => {
  //   const { hash } = req.params;
  const { email } = req.query;
  console.log(email);
  //   const { User } = req.app.locals.models;
  //   User.findOne({ hash })
  //     .then((user) => {
  //       if (!user) {
  //         return res.status(404).json({
  //           message: "User not found",
  //         });
  //       }
  //       if (user.email === email) {
  //         user.isVerified = true;
  //         user.save();
  //         return res.status(200).json({
  //           message: "Email verified",
  //         });
  //       }
  //       return res.status(400).json({
  //         message: "Email not verified",
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return res.status(500).json({
  //         message: "Something went wrong",
  //       });
  //     });
};

exports.sendEmail = async (req, res) => {
  const user = req.user;
  if (user.isVerified) {
    return res.status(400).json({
      message: "Email already verified",
    });
  }
  const hash = crypto.randomBytes(20).toString("hex");
  user.hash = hash;
  user.save();

  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <janadi4086@logodez.com>', // sender address
    to: `${user.email}`, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  return res.status(200).json({
    message: "Email sent for verification",
  });
};
