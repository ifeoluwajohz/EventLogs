const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fetch all tickets
const getTickets = async (req, res) => {
    try {
        const tickets = await prisma.ticket.findMany();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch tickets." });
    }
};

// Fetch ticket details
const getTicketDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await prisma.ticket.findUnique({ where: { id } });
        if (!ticket) return res.status(404).json({ error: "Ticket not found." });
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch ticket details." });
    }
};

// Create a ticket
const createTicket = async (req, res) => {
    const { eventId, userId, status, purchasedAt } = req.body;
    try {
        const ticket = await prisma.ticket.create({
            data: { eventId, userId, status, purchasedAt },
        });
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ error: "Failed to create ticket." });
    }
};

// Update a ticket
const updateTicket = async (req, res) => {
    const { id } = req.params;
    const { status, purchasedAt } = req.body;
    try {
        const ticket = await prisma.ticket.update({
            where: { id },
            data: { status, purchasedAt },
        });
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ error: "Failed to update ticket." });
    }
};

// Delete a ticket
const deleteTicket = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.ticket.delete({ where: { id } });
        res.status(200).json({ message: "Ticket deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete ticket." });
    }
};

module.exports = {
    getTickets,
    getTicketDetails,
    createTicket,
    updateTicket,
    deleteTicket,
};
