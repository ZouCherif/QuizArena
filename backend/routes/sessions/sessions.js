const express = require("express");
const router = express.Router();
const sessionsController = require("../../controllers/sessionsController");

router.get("/:sessionCode", sessionsController.joinSession);
router.get("/getCode/:id", sessionsController.getSessionCode);
router.get("/session/:id", sessionsController.getSession);

module.exports = router;
