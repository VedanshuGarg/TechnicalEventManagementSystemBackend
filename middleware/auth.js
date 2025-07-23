const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    req.user = decoded;
    next();
  });
};

const verifyUser = (req, res, next) => {
  const role = req.user.role;
  if (!["admin", "user", "vendor"].includes(role)) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

const checkRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: 'Forbidden: Insufficient role' });
  }
  next();
};

module.exports = { verifyToken, verifyUser, checkRole };
