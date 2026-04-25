import { Link } from "wouter";

export default function HomePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#0f1115", color: "white", fontFamily: "sans-serif" }}>
      
      {/* The Logo and Title */}
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px" }}>🐱 OMNIBROGOD</h1>
      <p style={{ color: "#a1a1aa", marginBottom: "30px", textAlign: "center", padding: "0 20px" }}>
        The 100% Free Code Studio. Build Websites and Android APKs.
      </p>

      {/* The Button that goes to the Editor */}
      <Link href="/editor/new-project-123">
        <button style={{ backgroundColor: "#4CAF50", color: "white", padding: "15px 30px", fontSize: "18px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>
          Start Coding Now
        </button>
      </Link>

    </div>
  );
}
