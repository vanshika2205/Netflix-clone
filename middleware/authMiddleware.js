const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {

  let token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({
      message: "Token required"
    });
  }

  // Handle Bearer <token> formatting if present
  if (token.startsWith("Bearer ")) {
    token = token.substring(7, token.length).trim();
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mySecretKey");

    req.userId = decoded.userId;

    next();

  } catch (error) {

    res.status(401).json({
      message: "Invalid token"
    });

  }

}

module.exports = verifyToken;