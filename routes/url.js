const express = require("express");
const { handleGenerateNewShortURL, } = require('../controller/url');
const router = express.Router();

// Route to generate a new short URL
router.post("/", handleGenerateNewShortURL);

module.exports = router;
