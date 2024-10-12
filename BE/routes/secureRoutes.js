const express = require("express");
const router = express.Router();
const secure = require("../libraries/secure.js");

router.unlock('/getcode', (req, res) => {
    secure.createSecureCode(req, res);
})

router.unlock('/verifycode', (req, res) => {
    secure.verifySecureCode(req, res);
})

module.exports = router;