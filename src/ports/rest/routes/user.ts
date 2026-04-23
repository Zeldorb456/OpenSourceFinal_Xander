import express, { NextFunction, Response, Request } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { authenticateToken, generateAccessToken, generateRefreshToken } from '../middleware/authentication';
import dependencies from '../../../infrastructure/dependencies';
import { createUser, getUserByUsername } from '../../../infrastructure/user';

const router = express.Router();

let refreshTokenDb: any = [];

router.post("/create", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userName, userPassword, email, role } = req.body;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userPassword, salt);

        const createUserData = {
            userName,
            userPassword: hashedPassword,
            email,
            role: role || 'user'
        };

        const createdUser = await createUser(dependencies)(createUserData);
        res.status(200).json({ userName: createdUser.userName, email: createdUser.email, role: createdUser.role });

    } catch (error) {
        console.log(`Error creating user: ${(error as Error).message}`);
        res.status(500).json({
          message: `Error creating user: ${(error as Error).message}`
        });
      }
})

router.post("/loginJwt", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getUserByUsername(dependencies)(req.body.userName);

        if(!user){
            throw new Error("Error logging in, unable to find username!!");
        }

        const compareResult = await bcrypt.compare(req.body.userPassword, user.userPassword);

        if(!compareResult){
            throw new Error("Error logging in, invalid password!");
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        refreshTokenDb.push(refreshToken);
        res.json({
            accessToken,
            refreshToken
        })

    } catch (error) {
        console.log(`Error logging in: ${(error as Error).message}`);
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
            // Will also contain an IAT which is the time when the token was issued
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


