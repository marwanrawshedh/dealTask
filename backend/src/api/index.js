const express = require("express");

const deals = require("./deal");
const users = require("./user");
const auth = require("./auth");
const claimedDeals = require("./claimedDeal");

const router = express.Router();
router.use("/deals", deals);
router.use("/users", users);
router.use("/authentication", auth);
router.use("/claimed-deals", claimedDeals);

module.exports = router;
