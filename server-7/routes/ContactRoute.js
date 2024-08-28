const express = require("express");
const router = express.Router()
const { conatctUs } = require("../controllers/ContactUs");

router.post("/contactUs", conatctUs);

module.exports = router;