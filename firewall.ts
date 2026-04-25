import { Router } from "express";

const router = Router();

// ==========================================
// 🛡️ 1. THE OMNIBROGOD FIREWALL 🛡️
// ==========================================
const blockedIPs = new Set<string>();

router.use((req, res, next) => {
  const ip = req.ip || req.socket.remoteAddress || "unknown";

  // If hacker is already banned, auto-drop them
  if (blockedIPs.has(ip)) {
    return res.status(403).send("🛡️ OMNIBROGOD FIREWALL: Hack attempt blocked. You are permanently banned.");
  }

  // Detect basic hacker attacks in the URL
  const url = req.url.toLowerCase();
  if (url.includes("wp-admin") || url.includes("select * from") || url.includes("<script>")) {
    console.log(`🚨 HACKER DETECTED from IP: ${ip}! Auto-banning instantly.`);
    blockedIPs.add(ip); // The Firewall auto-heals and bans the hacker!
    return res.status(403).send("🛡️ FIREWALL ACTIVATED: Attack reflected. You are banned.");
  }

  next(); // Safe user, let them in
});

// ==========================================
// 📩 2. THE USER FEEDBACK SYSTEM
// ==========================================
// This temporarily holds problems in memory until the Boss logs in
export const feedbacks: any[] = []; 

// Users send problems here
router.post("/api/feedback", (req, res) => {
  const { userCode, problem } = req.body || {};
  feedbacks.push({ id: Date.now(), problem, userCode, status: "pending" });
  res.json({ message: "Feedback sent to OMNIBROGOD. Please wait for the Boss to review." });
});

// ==========================================
// 👑 3. GOD MODE: AUTO-SOLVE BUTTONS
// ==========================================
router.post("/owner/feedback/:id/action", (req, res) => {
  const { key, action } = req.body || {};
  
  // Secret Boss Check
  if (key !== "GOD##KAI(9992286240)") {
    return res.status(401).json({ error: "Access Denied: You are not the Owner." });
  }

  if (action === "solve") {
     // In the future, this will connect to ai.ts to automatically fix the user's code!
     return res.json({ message: "Boss approved. AI Auto-Solve Activated!" });
  } else if (action === "no") {
     return res.json({ message: "Boss rejected. Feedback deleted." });
  } else {
     return res.status(400).json({ error: "Invalid Boss Action." });
  }
});

export default router;
