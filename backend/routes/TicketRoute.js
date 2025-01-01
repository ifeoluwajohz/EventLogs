const express = require("express");
const router = express.Router();
const {
    getTickets,
    getTicketDetails,
    createTicket,
    updateTicket,
    deleteTicket,
} = require("../controllers/ticketController");

router.get("/", getTickets); // Get all tickets
router.get("/:id", getTicketDetails); // Get details of a specific ticket
router.post("/", createTicket); // Create a new ticket
router.put("/:id", updateTicket); // Update a ticket
router.delete("/:id", deleteTicket); // Delete a ticket

module.exports = router;
