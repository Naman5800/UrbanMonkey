const { Clerk } = require('@clerk/clerk-sdk-node');
require('dotenv').config();

// Initialize Clerk
const clerk = new Clerk({ apiKey: process.env.CLERK_API_KEY });

const verifyClerkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    // Verify the token with Clerk
    const { sub } = await clerk.verifyToken(token);
    
    if (!sub) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    // Add the user info to the request object
    req.user = { id: sub };
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Authentication failed', details: error.message });
  }
};

module.exports = {
  verifyClerkToken
};