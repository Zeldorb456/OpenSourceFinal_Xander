import express from 'express';
import jwt from 'jsonwebtoken';
import dependencies from '../../../infrastructure/dependencies';
import { getUserByUsername } from '../../../infrastructure/user';

export const generateAccessToken = (user: any) => {
  return jwt.sign({ name: user.userName, role: user.role }, "12345abc", {expiresIn: '15s'});
}

export const generateRefreshToken = (user: any) => {
  return jwt.sign({ name: user.userName, role: user.role }, "12345abc")
}

export const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader: string | undefined = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if(token == null){
    return res.status(401).json({
      message: 'No token provided',
    })
  }

  jwt.verify(token, "12345abc", (err, user) => {
    if(err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  })
}

export const authenticateAdmin = async (req: any, res: any, next: any) => {
  const authHeader: string | undefined = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if(token == null){
    return res.status(401).json({
      message: 'No token provided',
    })
  }

  jwt.verify(token, "12345abc", async (err, decodedUser) => {
    if(err) {
      return res.sendStatus(403);
    }

    const payload = decodedUser as jwt.JwtPayload;
    if (!payload || typeof payload === 'string' || !payload.name) {
      return res.sendStatus(403);
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