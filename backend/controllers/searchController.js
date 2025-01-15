const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Search Events by User Location
const searchEventsByKeywords = async (req, res) => {
    const { location } = req.query;

    if (!location ) {
        return res.status(400).json({ error: "Location and Title parameter is required." });
    }

    try {
        const events = await prisma.event.findMany({
            where: {
                title: {
                    contains: location,
                    mode: "insensitive", // Case-insensitive search
                },
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



const searchEventsByLocation = async (req, res) => {
    try {
      const { location, keyword } = req.query;
  
      // Validate inputs
      if (!location) {
        return res.status(400).json({ error: "Location is required" });
      }
  
      // Query events based on location and optional keyword
      const events = await prisma.event.findMany({
        where: {
          AND: [
            { venue: { contains: location, mode: "insensitive" } },
            keyword
              ? {
                  OR: [
                    { title: { contains: keyword, mode: "insensitive" } },
                    { shortDescription: { contains: keyword, mode: "insensitive" } },
                    { longDescription: { contains: keyword, mode: "insensitive" } },
                  ],
                }
              : {},
          ],
        },
        include: {
          categories: {
            include: {
              category: true,
            },
          },
          admin: {
            select: {
              user: {
                select: {
                  prefferedName: true,
                },
              },
            },
          },
        },
      });
  
      if (events.length === 0) {
        return res.status(404).json({ message: "No events found in this location" });
      }
  
      res.status(200).json({
        count: events.length,
        message: `Found ${events.length} event(s) in the specified location.`,
        data: events,
      });
    } catch (error) {
      console.error("Error searching events:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };



module.exports = {
    searchEventsByLocation,
    searchEventsByKeywords
};
