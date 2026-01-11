const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ticketRoutes = require("./routes/ticketRoutes");

const app = express();

// 🔥 MIDDLEWARE
app.use(cors());
app.use(express.json());

// 🔗 ROUTES
app.use("/api", ticketRoutes);

// 🏠 ROOT CHECK
app.get("/", (req, res) => {
  res.send("Human-Like IT Ticket Decision Engine Running");
});

// 🗄️ DATABASE CONNECTION
mongoose
  .connect("mongodb://127.0.0.1:27017/it_ticket_engine")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// 🚀 START SERVER (IMPORTANT: PORT 4000)
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
