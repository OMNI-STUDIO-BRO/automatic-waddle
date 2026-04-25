import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function EditorPage({ params }: { params: { id: string } }) {
  const [code, setCode] = useState("<h1>OMNIBROGOD</h1>\n<style>\n  body { background: #222; color: white; text-align: center; font-family: sans-serif; }\n  h1 { color: #4CAF50; }\n</style>\n<script>\n  console.log('Website Live!');\n</script>");
  const [liveCode, setLiveCode] = useState(code);

  // ⏱️ THE PER-SECOND AUTO UPDATE ENGINE ⏱️
  // This waits exactly 1 second (1000ms) after you stop typing to update the screen!
  useEffect(() => {
    const timer = setTimeout(() => {
      setLiveCode(code);
    }, 1000); 
    return () => clearTimeout(timer);
  }, [code]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#0f1115", color: "white" }}>
      {/* Header Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", backgroundColor: "#1e1e24" }}>
        <Link href="/">
          <button style={{ padding: "5px 10px", cursor: "pointer", backgroundColor: "#333", color: "white", border: "none", borderRadius: "5px" }}>⬅ Back</button>
        </Link>
        <h2 style={{ margin: 0, fontSize: "16px" }}>OMNIBROGOD Code Studio</h2>
        <button style={{ backgroundColor: "#4CAF50", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px", fontWeight: "bold" }}>
          Build APK
        </button>
      </div>

      {/* Split Screen Container */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", flexDirection: "column" }}>
        
        {/* TOP HALF: The Typing Area */}
        <div style={{ flex: 1, padding: "10px", borderBottom: "2px solid #4CAF50" }}>
          <div style={{ color: "#a1a1aa", fontSize: "12px", marginBottom: "5px" }}>Code Editor:</div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
            style={{ width: "100%", height: "90%", backgroundColor: "#1e1e24", color: "#00ff00", fontFamily: "monospace", fontSize: "14px", border: "none", outline: "none", resize: "none" }}
          />
        </div>

        {/* BOTTOM HALF: The Live Preview */}
        <div style={{ flex: 1, backgroundColor: "white", padding: "5px" }}>
          <div style={{ color: "#333", fontSize: "12px", marginBottom: "5px", fontWeight: "bold", textAlign: "center" }}>
            Live Preview (Updates per second ⏱️)
          </div>
          <iframe
            srcDoc={liveCode}
            style={{ width: "100%", height: "85%", border: "1px solid #ccc", backgroundColor: "white", borderRadius: "5px" }}
            sandbox="allow-scripts allow-modals"
          />
        </div>

      </div>
    </div>
  );
}
