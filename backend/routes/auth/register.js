const express = require("express");
const router = express.Router();
const authController = require("../../controllers/authController");

router.post("/", authController.register);
router.post("/getVerificationCode", authController.getVerificationCode);
router.post("/verifyCode", authController.verifyCode);

module.exports = router;
