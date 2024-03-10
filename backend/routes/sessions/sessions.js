const express = require("express");
const router = express.Router();
const sessionsController = require("../../controllers/sessionsController");

router.get("/:sessionCode", sessionsController.joinSession);

module.exports = router;
