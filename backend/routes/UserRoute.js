const express = require("express");
const router = express.Router();
const  middleware  = require("../middleware/UserMiddleware")
const { getUserDetails, loginUser, updateUser, switchRole , getUserTicket , getAllTicket, deleteTicket , getUserBookings, getAllBoooking, deleteBooking } = require("../controllers/UserController");


// user profile conrollers
router.get("/getUser", middleware, getUserDetails); // Retrieve user details
router.post("/loginUser",  loginUser); // Create new User Account
router.put("/:id/updateUser", updateUser); // Update user details
router.put("/:id/updateUser", updateUser); // Update user details
router.put("/switchRole", middleware, switchRole)


// Retrieve all user's tickets
router.get("/:id/tickets", getUserTicket);
router.get("/getAll/tickets", getAllTicket)
router.delete("/:id/delete/ticket", deleteTicket)


// Retrieve all user's bookings
router.get("/:id/bookings", getUserBookings); // Retrieve user's bookings
router.get("/getAll/bookings", getAllBoooking)
router.post("/create/booking")
router.delete("/:id/delete/booking", deleteBooking)


module.exports = router;
