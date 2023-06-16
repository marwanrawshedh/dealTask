const express = require("express");
const controller = require("./controller.js");

const router = express.Router();

router.get("/:id", controller.getUser);
router.get("/", controller.getUsers);
router.post("/", controller.createUser);
router.post("/delete", controller.deleteUser);
router.put("/:id", controller.updateUser);

module.exports = router;
