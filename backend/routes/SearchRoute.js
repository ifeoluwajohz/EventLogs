const express = require("express");
const router = express.Router();
const { searchEventsByLocation, searchEventsByKeywords } = require("../controllers/searchController");

router.get("/byLocation/", searchEventsByKeywords);
router.get("/events/", searchEventsByLocation)


module.exports = router;
