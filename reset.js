const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const baseUrl = require("../utils/baseUrl");
const isEmail = require("validator/lib/isEmail");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.YOUR_EMAIL,
    pass: process.env.POUR_EMAIL_PASSWORD,
  },
});

// CHECK USER EXISTS AND SEND EMAIL FOR RESET PASSWORD
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!isEmail(email)) {
      return res.status(401).send("Invalid Email");
    }

    const user = await UserModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).send("User not found");
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.expireToken = Date.now() + 3600000;

    await user.save();

    const href = `${baseUrl}/reset/${token}`;

    const mailOptions = {
      from: "socialmediaapp8@gmail.com",
      to: user.email,
      subject: "Hi there! Password reset request",
      // text: `Hey ${user.name.split(" ")[0].toString()}`,
      html: `<p>Hey ${user.name
        .split(" ")[0]
        .toString()}, There was a request for password reset. <a href=${href}>Click this link to reset the password </a>   </p>
      <p>This token is valid for only 1 hour.</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.error(err);
      console.log("Email sent: " + info.response);
    });

    return res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// VERIFY THE TOKEN AND RESET THE PASSWORD IN DB

router.post("/token", async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token) {
      return res.status(401).send("Unauthorized");
    }

    if (password.length < 6)
      return res.status(401).send("Password must be atleast 6 characters");

    const user = await UserModel.findOne({ resetToken: token });

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (Date.now() > user.expireToken) {
      return res.status(401).send("Token expired.Generate new one");
    }

    user.password = await bcrypt.hash(password, 10);

    user.resetToken = "";
    user.expireToken = undefined;

    await user.save();

    return res.status(200).send("Password updated");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
