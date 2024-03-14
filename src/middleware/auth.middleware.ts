import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from "../config";
import userModel, { IUser } from "../models/user.model";

interface AuthenticateRequest extends Request {
    user?: IUser
}
interface JwtPayloadWithUserId extends jwt.JwtPayload {
    userId: string
}
export const authenticateUser = async (req: AuthenticateRequest, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        const token = authorization.split(" ")[1];
        try {
            const decoded = jwt.verify(token, SECRET_KEY!);
            const user = await userModel.findById((decoded as JwtPayloadWithUserId).userId).select("-password")!;
            if (user) {
                req.user = user;
                next();
            } else {
                res.status(401).send({ success: false, message: "Unauthorized: Invalid token" });
            }
        } catch (error) {
            console.error("Error verifying token:", error);
            res.status(401).send({ success: false, message: "Unauthorized: Invalid token" });
        }
    } else {
        res.status(400).send({ success: false, message: "Unauthorized: Bearer token not found" });
    }
};
