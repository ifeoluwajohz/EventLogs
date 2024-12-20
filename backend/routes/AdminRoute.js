const express = require("express");
const router = express.Router();
const { getAdminDetails, createAdmin, updateAdmin, getAdminTicket, getAllTicketAdmin, getAdminBooking, getAllBookingAdmin, getAdminEvent, getAllEventAdmin, createEvent, updateEvent, deleteEvent } = require("../controllers/AdminController");


// admin router
router.get("/:id/getAdmin", getAdminDetails); // Retrieve admin details
router.post("/createAdmin", createAdmin);
router.put("/:id/updateAdmin", updateAdmin);


// admin Events router
router.get("/:id/events", getAdminEvent); // Retrieve events managed by the admin
router.get("/AdminAllEvents", getAllEventAdmin);
router.post("/:id/events", createEvent); // Create a new event
router.put("/:id/events/:eventId", updateEvent); // Update an event
router.delete("/:id/events/:eventId", deleteEvent); // Delete an event


//admin tickets router
router.get("/:id/adminTicket", getAdminTicket);
router.get("/AdminAllTickets", getAllTicketAdmin);
// router.post


//admin booking router
router.get("/:id/adminBooking", getAdminBooking);
router.get("/AdminAllBookings", getAllBookingAdmin);

module.exports = router;
