import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, 'doraemon');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};


export const onlyRobots = (req, res, next) => {
  if (req.user.role !== 'robot') {
    return res.status(403).json({ message: 'Only robots can perform this action' });
  }
  next();
};
