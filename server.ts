import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API client safely (handle missing keys gracefully)
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
    try {
      ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          }
        }
      });
      console.log("Gemini API client initialized successfully.");
    } catch (e) {
      console.error("Failed to initialize Gemini API client:", e);
    }
  } else {
    console.log("No valid GEMINI_API_KEY found, running AI in educational fallback mode.");
  }

  // AI Finny Chat Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "Missing or invalid messages array" });
      }

      if (!ai) {
        // High-fidelity fallback simulated advisor if key is absent or pending user setup
        const lastUserMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";
        let responseText = "Hoot hoot! I am Finny, your wise owl financial helper! 🦉 ";
        
        if (lastUserMessage.includes("budget") || lastUserMessage.includes("50/30/20")) {
          responseText += "A budget is like a map for your money! The 50/30/20 rule is a super way to organize it: 50% goes to Needs (things you must have like food or rent), 30% to Wants (things you'd like to have like games or toys), and 20% goes straight into Savings! Whooo-ray for budgeting!";
        } else if (lastUserMessage.includes("interest") || lastUserMessage.includes("compound") || lastUserMessage.includes("save")) {
          responseText += "Compound interest is like magic! When you save money in a bank, the bank pays you extra money (interest). Then, you earn interest on your interest! It snowballs and grows into a giant money tree over time. The earlier you start saving, the bigger your tree grows!";
        } else if (lastUserMessage.includes("stock") || lastUserMessage.includes("invest") || lastUserMessage.includes("market")) {
          responseText += "Investing means buying a tiny piece of a company, called a share of stock! If the company does well, your share becomes worth more. But watch out, it's risky—if the company has a bad year, the price might go down! It's wise to diversify, which means not putting all your eggs in one basket!";
        } else if (lastUserMessage.includes("tax") || lastUserMessage.includes("paycheck")) {
          responseText += "Taxes are like a membership fee for living in a community! Part of the money earned on a paycheck goes to the government. This money is used to build awesome things we all share, like public parks, smooth roads, schools, and salaries for brave firefighters and teachers!";
        } else if (lastUserMessage.includes("credit") || lastUserMessage.includes("debt") || lastUserMessage.includes("card")) {
          responseText += "A credit card lets you borrow money to buy something now, but you must pay it back later! If you don't pay the full bill every month, the bank charges you extra (interest). That borrowed money can turn into a giant 'debt monster' if you are not careful! Always pay your bills on time!";
        } else {
          responseText += "That is a whooo-nderful question! Money is a tool that helps us achieve our dreams. Remember, the key financial pillars are Earning wisely, Budgeting carefully, Saving early, and giving back to help others! Ask me anything about budgeting, savings, stocks, credit cards, or career pathways!";
        }
        return res.json({ text: responseText });
      }

      // Convert messages to history and latest
      const chatHistory = messages.slice(0, -1).map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      }));
      const latestMessage = messages[messages.length - 1]?.content || "Hello!";

      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: "You are Finny the Wise Owl, a friendly, encouraging, and highly engaging financial literacy guide for middle school students (ages 11-14). Your goal is to explain financial concepts (budgeting, compound interest, stocks, taxes, debit vs credit, inflation, banking) in simple, kid-friendly terms. Use examples like buying snacks, purchasing video games, or starting a dog-walking or lawn-mowing business. Be encouraging, use occasional owl-themed puns (e.g. 'Whooo-ray!', 'Owl-some!', 'Wise choice!'), and keep responses short (1-3 small paragraphs). Never give actual investment or professional financial advice, always guide them to learn and discuss with parents/teachers.",
        },
        history: chatHistory
      });

      const response = await chat.sendMessage({ message: latestMessage });
      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Failed to contact Finny the Owl" });
    }
  });

  // Serve static assets in production, else let Vite handle it in dev
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Financial Literacy Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Server startup crashed:", err);
});
