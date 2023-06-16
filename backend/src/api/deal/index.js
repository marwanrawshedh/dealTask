const express = require("express");
const controller = require("./controller.js");

const router = express.Router();

router.get("/:id", controller.getDeal);
router.get("/", controller.getDeals);
router.post("/", controller.createDeal);
router.delete("/:id", controller.deleteDeals);
router.put("/:id", controller.updateDeal);


module.exports = router;
