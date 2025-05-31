import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'JWT token missing or invalid' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // or { id: decoded.id } depending on your token payload
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'JWT token missing or invalid' });
  }
};
