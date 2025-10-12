import express from 'express'
const router = express.Router();
import WordModel from "../models/user.js";

router.get('/', async (req, res) => {
    try {
        const wordlist = await WordModel.find();
        
        
        res.json(wordlist);
    } catch (err) {
        
        res.status(500).json({ error: "Server error" });
    }
});

export default router;

