const keywordWeights = {
  "down": 5,
  "not working": 4,
  "urgent": 3,
  "meeting": 3,
  "error": 2,
  "slow": 1
};

const roleWeights = { admin: 4, staff: 3, student: 1 };
const categoryWeights = { hardware: 4, network: 3, software: 2, access: 2 };

function calculateDecision(ticket) {
  let score = 0;
  let reasons = [];

  const text = ticket.description.toLowerCase();

  // Keyword reasoning
  for (const k in keywordWeights) {
    if (text.includes(k)) {
      score += keywordWeights[k];
      reasons.push(`Keyword "${k}" detected`);
    }
  }

  // Role reasoning
  score += roleWeights[ticket.userRole];
  reasons.push(`User role is ${ticket.userRole}`);

  // Category reasoning
  score += categoryWeights[ticket.issueCategory];
  reasons.push(`Issue category is ${ticket.issueCategory}`);

  // Final decision
  let priority, eta, explanation;

  if (score >= 10) {
    priority = "CRITICAL";
    eta = "1 hour";
    explanation = "Immediate attention required due to high impact issue.";
  } else if (score >= 7) {
    priority = "HIGH";
    eta = "4 hours";
    explanation = "Important issue affecting operations.";
  } else if (score >= 4) {
    priority = "MEDIUM";
    eta = "24 hours";
    explanation = "Issue can be resolved with normal priority.";
  } else {
    priority = "LOW";
    eta = "72 hours";
    explanation = "Minor issue with minimal impact.";
  }

  return {
    priority,
    eta,
    explanation,
    reasons,
    score
  };
}

module.exports = calculateDecision;
