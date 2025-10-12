import express from 'express';
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import flash from 'connect-flash';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Import routers
import addwordRouter from './routes/addwordRouter.js';
import viewwordsRouter from './routes/viewwordsRouter.js';
import quizRouter from './routes/quizRouter.js';

// Import DB connection
import db from './config/mongoose_connection.js';

// Load environment variables
dotenv.config({ path: './.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Session & flash
app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

// Routes
app.use('/addword', addwordRouter);
app.use('/viewwords', viewwordsRouter);
app.use('/quiz', quizRouter);

// Start server
app.listen(3000, () => console.log("🚀 Backend running on http://localhost:3000"));
