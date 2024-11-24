// src/middleware/authMiddleware.js
const { CognitoJwtVerifier } = require('aws-jwt-verify');
require('dotenv').config();

// Initialize the Cognito JWT verifier
const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.AWS_POOL_ID,
  tokenUse: "access",
  clientId: process.env.AWS_CLIENT_ID,
});

/**
 * Middleware to validate JWT tokens.
 */
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the token
    const payload = await verifier.verify(token);
    req.user = payload; // Attach user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized: Invalid token', error: error.message });
  }
};

module.exports = authenticate;
