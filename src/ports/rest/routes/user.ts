import express, { NextFunction, Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { authenticateToken, generateAccessToken, generateRefreshToken } from '../middleware/authentication';
import dependencies from '../../../infrastructure/dependencies';
import { createUser, getUserByUsername } from '../../../infrastructure/user';

const router = express.Router();

let refreshTokenDb: any = [];

router.post("/create", async (req: Request, res: Response) => {
    try {
        const { userName, userPassword, email, role } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(userPassword, salt);

        const userData = {
            userName,
            userPassword: hashed,
            email,
            role: role || 'user'
        };

        const newUser = await createUser(dependencies)(userData);
        res.json({ 
            userName: newUser.userName, 
            email: newUser.email, 
            role: newUser.role 
        });
    } catch (error) {
        console.error(`User creation failed: ${(error as Error).message}`);
        res.status(500).json({ message: (error as Error).message });
    }
})

router.post("/loginJwt", async (req: Request, res: Response) => {
    try {
        const user = await getUserByUsername(dependencies)(req.body.userName);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(req.body.userPassword, user.userPassword);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateAccessToken(user);
        const refresh = generateRefreshToken(user);
        refreshTokenDb.push(refresh);
        
        res.json({ accessToken: token, refreshToken: refresh })
    } catch (error) {
        console.error(`Login error: ${(error as Error).message}`);
        res.status(500).send({ error: (error as Error).message });
    }
})
        res.status(500).json({
            message: `Error logging in: ${(error as Error).message}`
        });
    }
})

router.post("/checkUserAuthenticated", authenticateToken, async (req: any, res: any, next: any) => {
    try {
        const user = req.user;
        console.log(user);
        res.json({
            message: "user has access",
            user,
        })

    } catch (error) {
        console.log(`Error checking authentication: ${(error as Error).message}`);
        res.status(500).json({
            message: `Error checking authentication: ${(error as Error).message}`
        });
    }
})

router.post("/token", async (req: any, res: any, next: any) => {
    const refreshToken = req.body.token;
    if(refreshToken == null) {
        return res.sendStatus(401);
    }
    if(!refreshTokenDb.includes(refreshToken)) {
        return res.sendStatus(403);
    }

    jwt.verify(refreshToken, "12345abc", (err: any, user: any) => {
        if(err) {
            return res.sendStatus(403);
        }
        const accessToken = generateAccessToken(user);
        res.json({accessToken: accessToken})
    })
})

router.delete("/logout", authenticateToken, async (req: any, res: any, next: any) => {
    refreshTokenDb = refreshTokenDb.filter((token: any) => token !== req.body.token);
    res.sendStatus(204);
})

export = router;


