const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const VerificationCode = require("../models/VerificationCode");

const generateTokens = (id, email, username) => {
  const accessToken = jwt.sign(
    {
      UserInfo: {
        id,
        email,
        username,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "59m" }
  );
  const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  return { accessToken, refreshToken };
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "all infomations are required" });
  const duplicateName = await User.findOne({ username });
  if (duplicateName)
    return res.status(400).json({ message: "Username already in use" });
  const duplicate = await User.findOne({ email: email });
  if (duplicate)
    return res.status(400).json({ message: "email already in use" });
  try {
    const hashedpwd = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      username,
      password: hashedpwd,
    });

    const { accessToken, refreshToken } = generateTokens(
      newUser._id,
      newUser.email,
      newUser.username
    );

    newUser.refreshToken = refreshToken;
    await newUser.save();
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 59 * 60 * 1000,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const infoToken = jwt.sign(
      {
        UserInfo: {
          username,
        },
      },
      process.env.INFO_TOKEN_SECRET,
      { expiresIn: "59m" }
    );
    res.cookie("infoToken", infoToken, {
      maxAge: 59 * 60 * 1000,
    });
    res.status(201).json({
      message: `New user ${newUser.name} created!`,
      infoToken,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required." });

  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) return res.status(401).json({ message: "User not found" });
  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const { accessToken, refreshToken } = generateTokens(
      foundUser._id,
      foundUser.email,
      foundUser.username
    );
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 59 * 60 * 1000,
      //domain: "localhost",
    });
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const infoToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
        },
      },
      process.env.INFO_TOKEN_SECRET,
      { expiresIn: "59m" }
    );

    res.cookie("infoToken", infoToken, {
      maxAge: 59 * 60 * 1000,
    });
    res.json({
      message: "successfully loged in",
      infoToken,
    });
  } else {
    res.status(401).json({ message: "Invalid password" });
  }
};

const handleGoogleAuth = async (req, res) => {
  if (!req.body.code) return res.status(401).json({ message: "Invalid code" });
  try {
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "postmessage"
    );
    const { tokens } = await oAuth2Client.getToken(req.body.code);
    const decoded = jwt_decode(tokens.id_token);
    let user = await User.findOne({ email: decoded.email }).exec();
    if (!user) {
      user = await User.create({
        email: decoded.email,
        username: decoded.name,
      });
    }
    const { accessToken, refreshToken } = generateTokens(
      user._id,
      user.email,
      user.username
    );

    user.refreshToken = refreshToken;
    const result = await user.save();

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 59 * 60 * 1000,
    });
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      message: "successfully loged in",
      accessToken,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const generateToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

const sendResetPasswordEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SEND_EMAIL,
      pass: process.env.EMAIL_PWD,
    },
  });

  const mailOptions = {
    from: process.env.SEND_EMAIL,
    to: email,
    subject: "QuizArena Password Reset Request",
    html: `<p>Please click the following link to reset your password: <a href="http://localhost:3000/resetPassword/${token}">Reset Password</a></p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (e) {
    console.log("error when sending the email", e.message);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = generateToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    await sendResetPasswordEmail(email, resetToken);

    res.json({ message: "Reset password email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending reset password email" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error resetting password" });
  }
};

const getVerificationCode = async (req, res) => {
  const email = req.body.email;
  if (!email) return res.status(404).json({ message: "Email required" });
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SEND_EMAIL,
      pass: process.env.EMAIL_PWD,
    },
  });
  const code = Math.floor(Math.random() * 90000) + 10000;
  const mailOptions = {
    from: process.env.SEND_EMAIL,
    to: email,
    subject: "QuizArena Verification code",
    html: `<p>Verification code: ${code}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    const verificationRecord = new VerificationCode({
      email: email,
      code: code,
    });
    await verificationRecord.save();
    res.status(200).send({ message: "code Sent" });
  } catch (e) {
    console.log("error when sending the email", e.message);
    res.status(500).send({ message: e.message });
  }
};

const verifyCode = async (req, res) => {
  if (!req.body.code || !req.body.email)
    return res.status(400).json({ message: "Code or email not found" });
  const { email, code } = req.body;
  try {
    const verificationRecord = await VerificationCode.findOne({ email, code });
    if (!verificationRecord)
      return res.status(400).json({ message: "Invalid code" });

    const currentTime = new Date();
    const expirationTime = verificationRecord.createdAt.getTime() + 3600 * 1000;

    if (currentTime <= expirationTime) {
      await VerificationCode.deleteOne({ email, code });
      return res.status(200).json({ message: "Code verified successfully" });
    } else {
      await VerificationCode.deleteOne({ email, code });
      return res.status(400).json({ message: "Expired code" });
    }
  } catch (e) {
    console.log("Error during code verification:", e.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleRefreshToken = async (req, res) => {
  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken)
    return res.status(403).json({ message: "No refresh token" });

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: foundUser._id,
          email: foundUser.email,
          username: foundUser.username,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "59m" }
    );
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 59 * 60 * 1000,
    });
    res.json({ accessToken });
  });
};

const handleLogout = async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) return res.sendStatus(204);
  res.clearCookie("refresh_token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.clearCookie("access_token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });

  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    return res.sendStatus(204);
  }
  foundUser.refreshToken = "";
  await foundUser.save();
  res.sendStatus(204);
};

module.exports = {
  register,
  login,
  handleGoogleAuth,
  forgotPassword,
  resetPassword,
  getVerificationCode,
  verifyCode,
  handleRefreshToken,
  handleLogout,
};
