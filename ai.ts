import { Router, type IRouter } from "express";
const router: IRouter = Router();

// This looks for your secret Gemini Key!
const GEMINI_KEY = process.env["GEMINI_API_KEY"] || process.env["GOOGLE_API_KEY"] || "";
const MODELS = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-pro"];

router.get("/ai/status", (_req, res) => res.json({ enabled: Boolean(GEMINI_KEY) }));

router.post("/ai/generate", async (req, res) => {
  if (!GEMINI_KEY) return res.status(503).json({ error: "AI is not configured." });
  
  const { prompt, system, fileName } = (req.body as { prompt?: string; system?: string; fileName?: string }) || {};
  if (!prompt) return res.status(400).json({ error: "Missing 'prompt'." });
  
  const composedSystem = system || "You are a senior web developer assistant inside OMNIBROGOD Code Studio. Return ONLY raw code with NO markdown fences when code is requested. " + (fileName ? `Active file: "${fileName}".` : "");
  const body = { 
    systemInstruction: { parts: [{ text: composedSystem }] }, 
    contents: [{ role: "user", parts: [{ text: prompt }] }], 
    generationConfig: { temperature: 0.7, maxOutputTokens: 4096 } 
  };
  
  let lastErr = "";
  for (const model of MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(GEMINI_KEY)}`;
      const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal: AbortSignal.timeout(60_000) });
      if (!r.ok) { lastErr = `${model} ${r.status}`; continue; }
      const data = (await r.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
      const text = data.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("") || "";
      return res.json({ text, model });
    } catch (e) { lastErr = `${model}: ${String(e)}`; }
  }
  res.status(502).json({ error: "All Gemini models failed", detail: lastErr });
});

export default router;
