const express = require("express");
const router = express.Router();

const Ticket = require("../models/Ticket");
const calculateDecision = require("../utils/decisionEngine");

// 🔥 CONFIRM ROUTE IS LOADED
console.log("✅ ticketRoutes loaded");

// 🧪 TEST ROUTE (IMPORTANT)
router.post("/test", (req, res) => {
  res.json({
    message: "POST WORKS",
    body: req.body
  });
});

// 🎯 CREATE NEW TICKET WITH HUMAN-LIKE DECISION
router.post("/tickets", async (req, res) => {
  try {
    const decision = calculateDecision(req.body);

    const ticket = new Ticket({
      userRole: req.body.userRole,
      issueCategory: req.body.issueCategory,
      description: req.body.description,

      priority: decision.priority,
      resolutionETA: decision.eta,
      decisionExplanation: decision.explanation,
      decisionReasons: decision.reasons,
      decisionScore: decision.score
    });

    await ticket.save();

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// 📥 GET ALL TICKETS (FOR LATER UI)
router.get("/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
