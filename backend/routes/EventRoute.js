const express = require("express");
const router = express.Router();
const { 
    getAllEvents, 
    getEventDetails, 
    addEventReview, 
    getEventReviews, 
    bookEvent, 
    createOrUpdateEvent,
    deleteEvent
} = require("../controllers/EventController");

// Middleware to check if the user is an admin
const  { AdminMiddleware }  = require("../middleware/AdminMiddleware");

// Event routes
router.get("/", getAllEvents); // Retrieve a list of events
router.post("/create", AdminMiddleware, createOrUpdateEvent); // Create a new event (Admin only)

router.get("/:id", getEventDetails); // Retrieve event details
router.post("/:id/reviews", AdminMiddleware, addEventReview); // Add a review for an event
router.get("/:id/reviews", getEventReviews); // Get reviews for a specific event
router.post("/:id/bookings", AdminMiddleware, bookEvent); // Book an event

router.delete("/delete/:id",  deleteEvent) // delete event you created
// router.delete("/booking/:id", AdminMiddleware, deleteBooking) // delete event you created

// Admin-specific routes

module.exports = router;