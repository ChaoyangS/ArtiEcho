// API Token configuration
const API_TOKEN = process.env.API_TOKEN || 'artiecho';

/**
 * Authentication middleware to verify API token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const auth = (req, res, next) => {
  try {
    const token = req.header('X-API-Token');

    if (!token) {
      return res.status(401).json({ 
        message: 'API Token is required',
        code: 'TOKEN_MISSING'
      });
    }

    if (token !== API_TOKEN) {
      return res.status(401).json({ 
        message: 'Invalid API Token',
        code: 'TOKEN_INVALID'
      });
    }

    // Add token info to request for logging/monitoring
    req.apiToken = {
      timestamp: new Date().toISOString(),
      token: token.substring(0, 4) + '...' // Only log first 4 chars for security
    };

    next();
  } catch (error) {
    res.status(401).json({ 
      message: 'Authentication failed',
      code: 'AUTH_ERROR'
    });
  }
};

module.exports = auth; 