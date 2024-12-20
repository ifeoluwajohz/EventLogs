const { PrismaClient } = require('@prisma/client'); 
const admin = require("firebase-admin");
const jwt = require('jsonwebtoken'); // For generating the token

const prisma = new PrismaClient(); 

const serviceAccount = require("../config/serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const generateToken = (adminId) =>{
    return jwt.sign({ adminId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
}

const getAdminDetails = async (req, res) => {
    try {
        const admin = req.admin; // Populated by `authenticate` middleware

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        res.status(200).json({ admin });
    } catch (error) {
        console.error("Error fetching admin profile:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

const createAdmin = async (req, res) => {
    const { idToken, profileName  } = req.body;

    try {
        if (!idToken) {
            return res.status(400).json({ error: "ID token is required" });
        }

        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid, name, email, picture } = decodedToken;

        let admin = await prisma.admin.findUnique({ where: { firebaseId: uid } });

        if (!admin) {
            admin = await prisma.admin.create({
                data: {
                    firebaseId: uid,
                    name: name || "Anonymous",
                    profileName : profileName || name,
                    email: email || null,
                    profilePicture: picture || null,
                },
            });
        }

        const token = generateToken(admin.id); // Generate JWT
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(201).json({ message: "admin authenticated successfully", admin });

    } catch (error) {
        console.error("Error verifying ID token:", error.message);
        res.status(400).json({ error: "Invalid token" });
    }
}

// Controller for uadminser login
const loginAdmin = async (req, res) => {
    const { idToken } = req.body;

    try {
        if (!idToken) {
            return res.status(400).json({ error: "ID token is required" });
        }

        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid, name, email, picture } = decodedToken;

        let admin = await prisma.admin.findUnique({ where: { firebaseId: uid } });

        if (!admin) {
            admin = await prisma.admin.create({
                data: {
                    firebaseId: uid,
                    name: name || "Anonymous",
                    email: email || null,
                    profilePicture: picture || null,
                },
            });
        }

        const token = generateToken(admin.id); // Generate JWT

        // Send the token in the response body, instead of setting it as a cookie
        res.status(200).json({
            message: "LoggedIn successfully",
            admin,
            token, // Send token in response
        });
        console.log(idToken);

    } catch (error) {
        console.error("Error verifying ID token:", error.message);
        res.status(400).json({ error: "Invalid token" });
    }
};

const updateAdmin = async (req, res) => {
    const { id } = req.params;
    try{
        const adminrData = req.body;
        // Logic to update admin details in the database
        res.status(201).json({ message: `Admin ID ${id} updated`, data: adminrData });
    }catch(err){
        console.log(err.message)
    }
};


//Event controlllers

const getAdminEvent = async (req, res) => {
    const {id} = req.params;

    try{
        res.status(201).json({message: `this is Event for Event ${id}`})
    }catch(err){
        console.log(err.message)
    }
}

const getAllEventAdmin = async (req, res) => {

    try{
        allEvent = await prisma.event.findMany({

        })
        res.status(201).json({message: `this is Event for Event`})
    }catch(err){
        console.log(err.message)
    }
}

const createEvent = async (req, res) =>{
    const { title, shortDescription, longDescription, date, venue, price, capacity, availableTickets, EventType, categories, createdAt } = req.body;
    try{
        newEvent = await prisma.event.create({
            data: {
                title : title,
                shortDescription : shortDescription,
                longDescription : longDescription,
                date : date,
                venue : venue,
                price : price || null,
                capacity : capacity,
                availableTickets : availableTickets,
                EventType: EventType || "FREE",
                categories : [categories],
                createdAt : createdAt || Date.now()
            }
        })
        res.status(201).json({message: `A new event Added`})
    }catch(err){
        console.log(err.message)
    }
}

const updateEvent = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(201).json({message: `Event ${id} updated`})
    }catch(err){
        console.log(err.message)
    }
}

const deleteEvent = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(201).json({message: `Event ${id} was deleted just now`})
    }catch(err){
        console.log(err.message)
    }
}


// Tickets controllers

const getAdminTicket = async (req, res) => {
    const { id } = req.params;
    // Logic to fetch tickets purchased by the admin
    try{
        const adminData = req.body;
        // Logic to update admin details in the database
        res.status(201).json({ message: `Tickets for admin ID: ${id}` });
    }catch(err){
        console.log(err.message)
    }
};

const getAllTicketAdmin = async (req, res) => {
    // Logic to fetch tickets purchased by the admin
    try{
        const adminData = req.body;
        // Logic to update admin details in the database
        res.status(201).json({ message: `Tickets for admin ID: ${id}` });
    }catch(err){
        console.log(err.message)
    }
};

const getAdminBooking = async (req, res) => {
    const { id } = req.params;
    // Logic to fetch bookings made by the admin
    try{
        const adminData = req.body;
        // Logic to update admin details in the database
        res.status(201).json({ message: `Bookings for admin ID: ${id}` });

    }catch(err){
        console.log(err.message)
    }
};

const getAllBookingAdmin = async (req, res) => {
    // Logic to fetch all bookings made by the admin
    try{
        const adminData = req.body;
        // Logic to update admin details in the database
        res.status(201).json({ message: `Bookings for admin ID: ${id}` });

    }catch(err){
        console.log(err.message)
    }
};

module.exports = { 
    getAdminDetails, 
    createAdmin, 
    loginAdmin,
    updateAdmin, 
    getAdminEvent, 
    getAllEventAdmin, 
    createEvent, 
    updateEvent, 
    deleteEvent, 
    getAdminTicket, 
    getAllTicketAdmin, 
    getAdminBooking, 
    getAllBookingAdmin 
};
