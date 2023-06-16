const express = require("express");
const controller = require("./controller.js");

const router = express.Router();

router.get("/", controller.getClaimedDeals);
router.post("/:id", controller.createClaimedDeal);

module.exports = router;
