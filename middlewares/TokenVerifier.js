import express from 'express';
import jwt  from 'jsonwebtoken';
function TokenVerifier(req, res, next) {
    const token = req.headers['x-token'];
    if (!token) {
      return res.status(401).json({ msg: 'Access denied. No token provided.' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.headers['user'] = decoded.user;
      next();
    } catch (error) {
      console.error(error);
      res.status(403).json({ msg: 'Token is not valid.' });
    }
    
  }

export default TokenVerifier;