# Human-Like IT Ticket Decision Engine

## Overview
This project is a full-stack IT support ticket system that automatically prioritizes tickets using human-like reasoning.  
Instead of simple rule matching, the system explains *why* a ticket is marked as LOW, MEDIUM, HIGH, or CRITICAL.

## Features
- Automatic ticket priority classification
- Explainable decision logic (priority, ETA, reasons)
- Role-based and keyword-based reasoning
- RESTful backend APIs
- MongoDB data persistence
- Simple frontend for end-to-end demonstration

## Tech Stack
- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Frontend: HTML, CSS, JavaScript
- Tools: VS Code, Thunder Client, curl

## How It Works
1. User submits an IT issue with role, category, and description.
2. Decision engine analyzes keywords, role impact, and issue type.
3. System assigns:
   - Priority level
   - Resolution ETA
   - Human-readable explanation
   - Decision reasons and score
4. Ticket is stored in MongoDB and returned to the UI.

## Example Output
```json
{
  "priority": "CRITICAL",
  "resolutionETA": "1 hour",
  "decisionExplanation": "Immediate attention required due to high impact issue.",
  "decisionReasons": [
    "Keyword \"urgent\" detected",
    "User role is admin",
    "Issue category is hardware"
  ]
}
