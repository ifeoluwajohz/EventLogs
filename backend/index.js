const express = require("express");
const app = express();
const userRoutes = require("./routes/UserRoute");
const searchRoutes = require("./routes/SearchRoute")
const eventRoutes = require("./routes/EventRoute");
// const ticketRoutes = require("./routes/TicketRoute");
const cors = require('cors')

app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));


// Routes
app.use("/user", userRoutes);
app.use("/event", eventRoutes);
app.use("/search", searchRoutes);
// app.use("/tickets", ticketRoutes);


// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});