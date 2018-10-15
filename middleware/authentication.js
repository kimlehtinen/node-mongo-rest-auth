const jwt = require('jsonwebtoken');

/**
 * This is a middleware used for authentication.
 * When a request is sent to a route
 * it includes an Authorization key
 * and its value is "token: secrettoken".
 * That's why we split the token at line 13 to only
 * verify the secrettoken and not the whole string that includes the token.
 */
module.exports = (req, res, next) => {
  try {
    const jwtToken = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(jwtToken, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Authentication failed',
    });
  }
  return true;
};
