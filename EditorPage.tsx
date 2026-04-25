import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";

export default function EditorPage({ params }: { params: { id: string } }) {
  // Initial Code: A 3D Start for a God-Level Game
  const [code, setCode] = useState(`// OMNIBROGOD 3D ENGINE START
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x4CAF50 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();`);

  const [liveCode, setLiveCode] = useState("");

  // ⏱️ HIGH-SPEED AUTO-UPDATE (100ms for "Real-Time" feel)
  useEffect(() => {
    const timer = setTimeout(() => {
      // We wrap the user code in a template that includes the 3D Engine (Three.js)
      const fullHTML = `
        <html>
          <body style="margin:0; overflow:hidden; background:#000;">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
            <script>${code}<\/script>
          </body>
        </html>
      `;
      setLiveCode(fullHTML);
    }, 500); // 0.5 second delay to save battery
    return () => clearTimeout(timer);
  }, [code]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#09090b", color: "white" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", background: "#18181b", borderBottom: "1px solid #27272a" }}>
        <Link href="/"><button style={{ background: "#27272a", color: "white", border: "none", padding: "8px 15px", borderRadius: "6px" }}>⬅</button></Link>
        <span style={{ fontWeight: "bold", color: "#4CAF50" }}>GOD-LEVEL ENGINE v1.0</span>
        <button style={{ background: "#4CAF50", color: "white", border: "none", padding: "8px 15px", borderRadius: "6px", fontWeight: "bold" }}>BUILD APK</button>
      </div>

      {/* Editor & 3D Preview */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Input Area */}
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck="false"
          style={{
            flex: 1,
            background: "#09090b",
            color: "#4ade80",
            fontFamily: "'Fira Code', monospace",
            fontSize: "14px",
            padding: "15px",
            border: "none",
            outline: "none",
            resize: "none"
          }}
        />
        
        {/* 3D Game Preview Window */}
        <div style={{ height: "40%", background: "#000", borderTop: "2px solid #4CAF50", position: "relative" }}>
          <div style={{ position: "absolute", top: "5px", left: "10px", fontSize: "10px", color: "#4CAF50", zIndex: 10 }}>LIVE GPU RENDER (3D ACTIVE)</div>
          <iframe
            srcDoc={liveCode}
            style={{ width: "100%", height: "100%", border: "none" }}
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  );
}
