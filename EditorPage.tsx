import { useState } from "react";
import { Link } from "wouter";

export default function EditorPage({ params }: { params: { id: string } }) {
  const [code, setCode] = useState("<h1>Hello OMNIBROGOD!</h1>\n<p>Start typing your code here...</p>");

  // This handles the typing from the mobile keyboard!
  const handleTyping = (e: any) => {
    setCode(e.target.value);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#0f1115", color: "white" }}>
      {/* Header Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", backgroundColor: "#1e1e24" }}>
        <Link href="/">
          <button style={{ padding: "5px 10px", cursor: "pointer" }}>⬅ Back</button>
        </Link>
        <h2 style={{ margin: 0, fontSize: "16px" }}>OMNIBROGOD Code Studio</h2>
        <button style={{ backgroundColor: "#4CAF50", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px" }}>
          Build APK
        </button>
      </div>

      {/* The Typing Area (Keyboard goes here!) */}
      <div style={{ flex: 1, padding: "10px" }}>
        <textarea
          value={code}
          onChange={handleTyping}
          spellCheck="false"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#1e1e24",
            color: "#00ff00",
            fontFamily: "monospace",
            fontSize: "16px",
            border: "1px solid #333",
            padding: "10px",
            borderRadius: "5px",
            outline: "none"
          }}
        />
      </div>
    </div>
  );
}
