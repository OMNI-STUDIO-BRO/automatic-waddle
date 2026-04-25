import { useState } from "react";
import { Link } from "wouter";

export default function OwnerPage() {
  const [key, setKey] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  // 👑 The Secret Password Check 👑
  const handleLogin = () => {
    if (key === "GOD##KAI(9992286240)") {
      setUnlocked(true);
    } else {
      alert("🚨 ACCESS DENIED: Firewall Activated! Hacker detected!");
    }
  };

  // Screen 1: The Secret Login
  if (!unlocked) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#0f1115", color: "red", fontFamily: "sans-serif" }}>
        <h1>👑 GOD MODE LOGIN</h1>
        <p style={{ color: "#a1a1aa", marginBottom: "20px" }}>Enter the Secret Master Password:</p>
        <input 
          type="password" 
          value={key} 
          onChange={(e) => setKey(e.target.value)} 
          style={{ padding: "15px", fontSize: "18px", marginBottom: "20px", borderRadius: "8px", border: "2px solid red", backgroundColor: "black", color: "red", textAlign: "center", width: "80%", maxWidth: "300px" }}
        />
        <button onClick={handleLogin} style={{ padding: "15px 30px", backgroundColor: "red", color: "white", fontSize: "16px", fontWeight: "bold", border: "none", borderRadius: "8px", cursor: "pointer" }}>
          UNLOCK DASHBOARD
        </button>
      </div>
    );
  }

  // Screen 2: The Boss Dashboard (Only you can see this!)
  return (
    <div style={{ padding: "20px", backgroundColor: "#0f1115", color: "white", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "#4CAF50", borderBottom: "2px solid #4CAF50", paddingBottom: "10px" }}>👑 Welcome, Boss.</h1>
      <p style={{ color: "#a1a1aa" }}>System Online. Firewall Active. Auto-Healing is ON.</p>
      
      {/* Feedback & Auto-Solve Panel */}
      <div style={{ border: "1px solid #333", padding: "15px", borderRadius: "8px", marginTop: "20px", backgroundColor: "#1e1e24" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "15px" }}>🚨 User Feedback & Problems</h2>
        
        {/* Example of a problem waiting for you */}
        <div style={{ backgroundColor: "#0f1115", padding: "15px", borderRadius: "5px", marginBottom: "10px", borderLeft: "4px solid orange" }}>
          <p style={{ margin: "0 0 10px 0" }}><strong>Unknown User:</strong> "My code has an error, please help!"</p>
          <button style={{ backgroundColor: "#4CAF50", color: "white", padding: "8px 15px", marginRight: "10px", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
            Auto-Solve (AI) 🤖
          </button>
          <button style={{ backgroundColor: "#ff4444", color: "white", padding: "8px 15px", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
            NO (Delete) 🗑️
          </button>
        </div>

      </div>
      
      <Link href="/">
        <button style={{ marginTop: "30px", padding: "10px 20px", backgroundColor: "#333", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>⬅ Exit God Mode</button>
      </Link>
    </div>
  );
}
