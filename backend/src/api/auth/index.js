const express = require("express");
const controller = require("./controller.js");

const router = express.Router();

router.post("/sign-in", controller.signIn);
router.post("/check-access", controller.checkAccess);

module.exports = router;
