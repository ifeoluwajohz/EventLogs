const { PrismaClient } = require('@prisma/client'); 
const admin = require("firebase-admin");
const jwt = require('jsonwebtoken'); // For generating the token

const prisma = new PrismaClient(); 

const serviceAccount = require("../configs/serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const generateToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET,   {
        expiresIn : '7d'
    })
}




// user profile controllers
const getUserDetails = async (req, res) => {
    const { id } = req.params;
    // Logic to retrieve user details from the database
    try{
        res.json({ message: `Retrieved user details for user ID: ${id}` });

    }catch(err){
        console.log(err.message)
    }
};

const loginUser = async (req, res) => {
    const { idToken } = req.body;

    try {
        if (!idToken) {
            return res.status(400).json({ error: "ID token is required" });
        }

        // Verify the ID token
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid, name, email, picture } = decodedToken;

        // Check if the user exists in the database
        let user = await prisma.user.findUnique({ where: { firebaseUid: uid } });

        if (user) {
            // Generate JWT for existing user
            const token = generateToken(user.id);

            return res.status(200).json({
                message: "Logged in successfully",
                user,
                token,
            });
        }

        // Create a new user if not found
        user = await prisma.user.create({
            data: {
                firebaseUid: uid,
                name: name || "Anonymous",
                email: email || null,
                profilePicture: picture || null,
                role: "USER",
            },
        });

        // Generate JWT for the new user
        const token = generateToken(user.id);

        // Respond with user details and token
        res.status(201).json({
            message: "Welcome, new user!",
            user,
            token,
        });

    } catch (err) {
        console.error("Error verifying ID token:", err.message);
        res.status(400).json({ error: "Invalid token" });
    }
};


const updateUser = async (req, res) => {
    const { id } = req.params; // Extract the user ID from URL parameters
    const userData = req.body; // Extract user data from the request body
  
    try {
      // Check if the user exists
      const existingUser = await prisma.user.findUnique({
        where: { id: Number(id) }, // Ensure `id` is a number
      });
  
      if (!existingUser) {
        return res.status(404).json({ error: `User with ID ${id} not found` });
      }
  
      // Update the user with new data
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: userData, // Dynamically update with the provided data
      });
  
      res.status(200).json({
        message: `User ID ${id} updated successfully`,
        data: updatedUser,
      });
    } catch (err) {
      console.error("Error updating user:", err.message);
      res.status(500).json({ error: "Failed to update user" });
    }
  };
  


// user tickets controllers
const getUserTicket = async (req, res) => {
    const { id } = req.params;
    // Logic to fetch tickets purchased by the user
    try{
        const userData = req.body;
        // Logic to update user details in the database
        res.status(201).json({ message: `Tickets for user ID: ${id}` });
    }catch(err){
        console.log(err.message)
    }
};

const getAllTicket = async (req, res) => {
    try{
        req.status(201).json({message : "All tickets"})
    }catch(err){
        console.log(err.message)
    }
}

const deleteTicket = async (req, res) => {
    const {id} = req.params;

    try{
        req.staus(201).json({message: `deleted post ${id}`})
    }catch(err){
        console.log(err.message)
    }
}


// user bookings controllers
const getUserBookings = async (req, res) => {
    const { id } = req.params;
    // Logic to fetch bookings made by the user
    try{
        const userData = req.body;
        // Logic to update user details in the database
        res.status(201).json({ message: `Bookings for user ID: ${id}` });

    }catch(err){
        console.log(err.message)
    }
};

const getAllBoooking = async (req, res) => {
    try{
        req.status(201).json({message : "All Boookings"})
    }catch(err){
        console.log(err.message)
    }
}

const createBooking = async (req, res) => {
    const {} = req.body;
    try{
        req.status(201).json({message : "Boooking created"})
    }catch(err){
        console.log(err.message)
    }
}

const deleteBooking = async (req, res) => {
    const {id} = req.params;

    try{
        req.staus(201).json({message: `deleted post ${id}`})
    }catch(err){
        console.log(err.message)
    }
}


module.exports = { getUserDetails,loginUser, updateUser, getUserTicket , getAllTicket, deleteTicket , getUserBookings, getAllBoooking, createBooking, deleteBooking };
