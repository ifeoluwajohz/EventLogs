const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Search Events by User Location
const searchEventsByLocation = async (req, res) => {
    const { location } = req.query;

    if (!location) {
        return res.status(400).json({ error: "Location parameter is required." });
    }

    try {
        const events = await prisma.event.findMany({
            where: {
                venue: {
                    contains: location,
                    mode: "insensitive", // Case-insensitive search
                },
            },
        });

        if (events.length === 0) {
            return res.status(404).json({ message: "No events found for the given location." });
        }

        res.status(200).json(events);
    } catch (error) {
        console.error("Error searching by location:", error.message);
        res.status(500).json({ error: "Failed to search by location." });
    }
};

module.exports = {
    searchEventsByLocation,
};
