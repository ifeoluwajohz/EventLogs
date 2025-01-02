const express = require("express");
const router = express.Router();
const  {UserMiddleware}  = require("../middleware/UserMiddleware")
const { 
    getUserDetails, 
    loginUser, 
    updateUser, 
    switchRole , 
    getUserTicket , 
    getAllTicket, 
    deleteTicket
    
} = require("../controllers/UserController");


// user profile conrollers
router.get("/getUser", UserMiddleware, getUserDetails); // Retrieve user details
router.post("/loginUser",  loginUser); // Create new User Account
// router.put("/:id/updateUser", updateUser); // Update user details
router.put("/updateUser/:id", updateUser); // Update user details
router.put("/switchRole", UserMiddleware, switchRole)


// Retrieve all user's tickets
router.get("/:id/tickets", getUserTicket);
router.get("/getAll/tickets", getAllTicket)
router.delete("/:id/delete/ticket", deleteTicket)


module.exports = router;
