const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fetch all events
const getAllEvents = async (req, res) => {
    try {
        const events = await prisma.event.findMany();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch events." });
    }
}; 

// Fetch event details
const getEventDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await prisma.event.findUnique({
            where: { id },
        });
        if (!event) return res.status(404).json({ error: "Event not found." });
        res.status(200).json(event);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
};

// Add a review for an event
const addEventReview = async (req, res) => {
    const { id } = req.params;
    const { userId, rating, comment } = req.body;
    try {
        const review = await prisma.eventReview.create({
            data: {
                eventId: id,
                userId,
                rating,
                comment,
            },
        });
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: "Failed to add review." });
    }
};

// Get reviews for a specific event
const getEventReviews = async (req, res) => {
    const { id } = req.params;
    try {
        const reviews = await prisma.eventReview.findMany({
            where: { eventId: id },
        });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch reviews." });
    }
};

// Book an event
const bookEvent = async (req, res) => {
    const { id } = req.params;
    const { userId, quantity, totalAmount } = req.body;
    try {
        const booking = await prisma.booking.create({
            data: {
                eventId: id,
                userId,
                quantity,
                totalAmount: totalAmount | 0,
            },
        });
        res.status(201).json(booking);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error.message });
    }
};

const getAllBookedEvents = async (req, res) => {
    const { id } = req.params;
    try {
        const bookedEvents = await prisma.booking.findMany({
            where: {userId : id},
            include: {
                event: true, // Include associated event details
                user: true,  // Include user details if needed
            },
        });
        res.status(200).json(bookedEvents);
    } catch (error) {
        console.log("Error fetching booked events:", error);
        res.status(500).json({ error: error.message });
    }
};

const getSingleBookedEvent = async (req, res) => {
    const { id } = req.params; // Booking ID

    try {
        const booking = await prisma.booking.findUnique({
            where: { id: id }, // Adjust the field name if needed
            include: {
                event: true, // Update to match your Prisma schema
                user: true,  // Update to match your Prisma schema
            },
        });

        if (!booking) {
            return res.status(404).json({ error: "Booking not found." });
        }

        res.status(200).json(booking);
        console.log(id)
    } catch (error) {
        console.error("Error fetching booking:", error); // Log the full error
        res.status(500).json({ error: "Internal server error." });
    }
};

const deleteAllBookings = async (req, res) => {
    const { id } = req.params; // User ID
    try {
        await prisma.booking.deleteMany({
            where: { userId: id },
        });
        res.status(200).json({ message: "All bookings deleted successfully." });
    } catch (error) {
        console.error("Error deleting bookings:", error);
        res.status(500).json({ error: error.message });
    }
};

const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.event.delete({
            where: { id },
        });
        res.status(200).json({ message: "Event deleted successfully." });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "Failed to Event booking." });
    }
};

// Create or update an event (Admin only)
const createOrUpdateEvent = async (req, res) => {
    const { id } = req.admin; // Replace with your admin ID source
    const {
        title,
        shortDescription,
        longDescription,
        date,
        venue,
        eventType = "FREE",
        price,
        availableTickets,
        // pictureId = "https://chatgpt.com/c/6773b291-158c-8001-a144-d6d48086a84b",
        categoryIds, // Array of category IDs
    } = req.body;

    try {
        // Validate inputs
        console.log(req.admin)
        if (!title || !date) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        const parsedDate = new Date(date);
        if (isNaN(parsedDate)) {
            return res.status(400).json({ error: "Invalid date format." });
        }

        const event = await prisma.event.create({
            data: {
                title,
                shortDescription,
                longDescription,
                date: parsedDate,
                venue,
                eventType,
                price: eventType === "PAID" ? parseFloat(price) : null,
                availableTickets: parseInt(availableTickets, 10),
                admin: {
                    connect: { userId: id }, // Connect Admin by userId
                },
                // picture: pictureId
                //     ? {
                //           connect: { id: pictureId },
                //       }
                //     : undefined,
                categories: categoryIds?.length
                    ? {
                          connect: categoryIds.map((id) => ({ id })),
                      }
                    : undefined,
            },
        });

        res.status(201).json(event);
    } catch (error) {
        console.error("Error in createOrUpdateEvent:", error);
        res.status(500).json({ error: error.message });
    }
};




// const createOrUpdateEvent = async (req, res) => {
//     // const { id } = req.params;
//     const  {id}  = req.admin;
//     const {
//         title,
//         shortDescription,
//         longDescription,
//         date,
//         venue,
//         eventType,
//         price,
//         availableTickets,
//         admin,
//         pictureId,
//         categories,
//     } = req.body;

//     try {
//         // Validate required fields
//         if(id){
//             console.log(id)
//         }
//         if (!title || !date || !price || !admin) {
//             return res.status(400).json({ error: "Missing required fields." });
//         }

//         // Parse and validate date
//         const parsedDate = new Date(date);
//         if (isNaN(parsedDate)) {
//             return res.status(400).json({ error: "Invalid date format." });
//         }

//         let event;
//         if (id) {
//             // Update event
//             event = await prisma.event.update({
//                 where: { id },
//                 data: {
//                     title,
//                     shortDescription,
//                     longDescription,
//                     date: parsedDate,
//                     venue,
//                     eventType,
//                     price,
//                     availableTickets,
//                     admin,
//                     picture: { connect: { id: pictureId } },
//                     categories: {
//                         connect: categories.map((categoryId) => ({ id: categoryId })),
//                     },
//                 },
//             });
//         } else {
//             // Create new event
//             event = await prisma.event.create({
//                 data: {
//                     title,
//                     shortDescription,
//                     longDescription,
//                     date: parsedDate,
//                     venue,
//                     eventType,
//                     price,
//                     availableTickets,
//                     admin,
//                     picture: { connect: { id: pictureId } },
//                     categories: {
//                         connect: categories.map((categoryId) => ({ id: categoryId })),
//                     },
//                 },
//             });
//         }

//         res.status(200).json(event);
//         console.log(event)
//     } catch (error) {
//         console.log("Error in createOrUpdateEvent:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

const sampleTicket = async (req, res) => {
    try{
        console.log(req.body)
        console.log(req.query)
    }catch(err){
        console.log(err.message)
    }
}



module.exports = {
    sampleTicket,
    getAllEvents,
    getEventDetails,
    addEventReview,
    getEventReviews,
    bookEvent,
    deleteEvent,
    createOrUpdateEvent,
    getAllBookedEvents,
    getSingleBookedEvent, // New function added here
    deleteAllBookings,
};
