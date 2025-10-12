import express from 'express'
const router = express.Router();
import WordModel from "../models/user.js";

router.post('/', async (req, res) => {
  try {
    const { word, meaning, sentence } = req.body;

    if (!word || !meaning || !sentence) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const createdWord = await WordModel.create({
      wordname: word,
      meaning,
      sentence,
    });

    

    return res.status(201).json({
      success: true,
      message: "Word added successfully",
      data: createdWord,
    });

  } catch (error) {
    
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;