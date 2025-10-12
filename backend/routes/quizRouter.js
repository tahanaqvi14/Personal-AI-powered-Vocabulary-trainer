import { GoogleGenAI } from "@google/genai";
import express from "express";
import dotenv from "dotenv";
import WordModel from "../models/user.js";

dotenv.config();
const router = express.Router();

// Initialize Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Route: Get a random word
router.get("/", async (req, res) => {
  try {
    const wordlist = await WordModel.find();
    if (!wordlist || wordlist.length === 0) {
      return res.status(404).json({ error: "No words found" });
    }

    const randomWord = wordlist[Math.floor(Math.random() * wordlist.length)];
    res.json({ word: randomWord.wordname });
  } catch (err) {
    
    res.status(500).json({ error: "Failed to fetch words" });
  }
});

// Route: Check user answer (meaning + sentence)
router.get("/answer", async (req, res) => {
  const { word, meaning, sentence } = req.query;

  if (!word || !meaning || !sentence) {
    return res.status(400).json({ error: "Missing word, meaning or sentence" });
  }

  const prompt = `
    The word is "${word}".
    User provided meaning: "${meaning}"
    User provided sentence: "${sentence}"

    Answer with ONLY YES or NO for each:
    1. Is the user meaning correct? (YES/NO)
    2. Is the sentence correct? (YES/NO)

    Respond in JSON format like:
    {
      "meaningCorrect": "YES",
      "sentenceCorrect": "NO"
    }
  `;

  try {
    // Generate response from Gemini
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // Extract text
    let aiText = response?.text || "";

    // Remove Markdown code fences (```json or ```)
    aiText = aiText.replace(/```(?:json)?/g, "").trim();

    // Parse JSON
    let answer;
    try {
      answer = JSON.parse(aiText);
    } catch (err) {
      
      return res.status(500).json({ error: "AI returned invalid JSON" });
    }

    res.json(answer);

  } catch (err) {

    res.status(500).json({ error: "AI failed to provide meaning" });
  }
});

export default router;
