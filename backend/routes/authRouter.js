import express from 'express';

const router = express.Router();

// Hardcoded credentials
const ADMIN_USER_ID = 'thecityschool';
const ADMIN_PASSWORD = 'thecityschool';

// Login endpoint
router.post('/', async (req, res) => {
  try {
    const { userId, password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'User ID and password are required' 
      });
    }

    // Check credentials
    if (userId === ADMIN_USER_ID && password === ADMIN_PASSWORD) {
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        userType: 'admin'
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid user ID or password'
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;

