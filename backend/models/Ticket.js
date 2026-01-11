const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    userRole: {
      type: String,
      required: true,
      enum: ["admin", "staff", "student"]
    },

    issueCategory: {
      type: String,
      required: true,
      enum: ["hardware", "software", "network", "access"]
    },

    description: {
      type: String,
      required: true
    },

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"]
    },

    resolutionETA: {
      type: String
    },

    // 🔥 HUMAN-LIKE DECISION DATA
    decisionExplanation: {
      type: String
    },

    decisionReasons: {
      type: [String]
    },

    decisionScore: {
      type: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
