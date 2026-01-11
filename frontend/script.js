const userRole = document.getElementById("userRole");
const issueCategory = document.getElementById("issueCategory");
const description = document.getElementById("description");
const preview = document.getElementById("preview");
const resultDiv = document.getElementById("result");
const submitBtn = document.getElementById("submitBtn");

// 🔥 LIVE PRIORITY PREVIEW
description.addEventListener("input", () => {
  const text = description.value.toLowerCase();
  let level = "LOW";

  if (text.includes("slow") || text.includes("error")) level = "MEDIUM";
  if (text.includes("urgent") || text.includes("not working")) level = "HIGH";
  if (text.includes("down") || text.includes("client")) level = "CRITICAL";

  preview.innerText = "Likely Priority: " + level;
});

// 🚀 SUBMIT TICKET
submitBtn.addEventListener("click", async () => {
  resultDiv.innerHTML = "";
  submitBtn.innerText = "Analyzing...";
  submitBtn.disabled = true;

  const data = {
    userRole: userRole.value,
    issueCategory: issueCategory.value,
    description: description.value
  };

  try {
    const res = await fetch("http://localhost:4000/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    resultDiv.className = result.priority;
    resultDiv.innerHTML = `
      <h3>Priority: ${result.priority}</h3>
      <p><b>ETA:</b> ${result.resolutionETA}</p>
      <p>${result.decisionExplanation}</p>
      <ul>${result.decisionReasons.map(r => `<li>${r}</li>`).join("")}</ul>
    `;
  } catch (err) {
    alert("Error connecting to backend");
  }

  submitBtn.innerText = "Submit Ticket";
  submitBtn.disabled = false;
});
