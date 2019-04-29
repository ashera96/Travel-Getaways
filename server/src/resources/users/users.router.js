const { Router } = require("express");
const { getMe, updateMe } = require("./users.controller");

const router = Router();

router.get("/", getMe);
router.put("/", updateMe);

module.exports = router;
