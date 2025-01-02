const express = require("express");
const router = express.Router();
const { searchEventsByLocation } = require("../controllers/searchController");

router.get("/byLocation/", searchEventsByLocation);


module.exports = router;
