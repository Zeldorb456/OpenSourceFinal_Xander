import express from 'express';
import jwt from 'jsonwebtoken';
import dependencies from '../../../infrastructure/dependencies';
import { getUserByUsername } from '../../../infrastructure/user';

const JWT_SECRET = "12345abc";

export const generateAccessToken = (user: any) => {
  return jwt.sign(
    { name: user.userName, role: user.role },
    JWT_SECRET,
    { expiresIn: '15s' }
  );
}

export const generateRefreshToken = (user: any) => {
  return jwt.sign(
    { name: user.userName, role: user.role },
    JWT_SECRET
  );
}

export const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Missing authorization header' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      console.warn('Token verification failed:', err.message);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

export const authenticateAdmin = async (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  jwt.verify(token, JWT_SECRET, async (err: any, decodedUser: any) => {
    if (err) {
      console.warn('Admin auth failed:', err);
      return res.sendStatus(403);
    }

    if (!decodedUser || typeof decodedUser === 'string' || !decodedUser.name) {
      return res.status(403).json({ message: 'Invalid token payload' });
    }

    try {
      const user = await getUserByUsername(dependencies)(decodedUser.name);
      if (!user || user.role !== 'admin') {
    }

    const user = await getUserByUsername(dependencies)(payload.name);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({
        message: 'Admin access required',
      });
    }

    req.user = user;
    next();
  })
}