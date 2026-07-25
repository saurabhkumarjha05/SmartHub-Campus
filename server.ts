import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Gemini API setup (lazy initialized or used safely)
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "smart-campus-hub",
        },
      },
    });
  }
  return aiClient;
}

// AI Tutor endpoint
app.post("/api/ai-tutor", async (req, res) => {
  try {
    const { prompt, mode, topic, history } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are Smart Campus Hub's expert AI Academic Tutor and Study Assistant.
Your goal is to help college students excel in their courses (e.g. Computer Science, Algorithms, Mathematics, Biology, Physics, Literature, Economics).
Mode: ${mode || "Exam Prep"}
Topic: ${topic || "Algorithms"}

Guidelines:
- Provide clear, encouraging, mathematically precise, and visually formatted explanations.
- Use clean Markdown syntax.
- If appropriate, break down formulas step-by-step or provide concise pseudocode blocks.
- Keep responses engaging, structured, and directly actionable for studying.`;

    // Construct contents with prompt and simple context
    const contents = history && Array.isArray(history) && history.length > 0
      ? [
          ...history.map((h: { sender: string; text: string }) => ({
            role: h.sender === "user" ? "user" : "model",
            parts: [{ text: h.text }],
          })),
          { role: "user", parts: [{ text: prompt }] },
        ]
      : prompt;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I've analyzed your question! Let's work through this step by step.";
    res.json({ text: replyText });
  } catch (error: any) {
    console.error("AI Tutor API Error:", error);
    res.status(500).json({
      error: error.message || "Failed to generate AI response. Please ensure GEMINI_API_KEY is configured.",
    });
  }
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "Smart Campus Hub" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Smart Campus Hub server running on http://localhost:${PORT}`);
  });
}

startServer();
