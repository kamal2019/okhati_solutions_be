import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import userModel from "../models/user.model";

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log(email, password, 'kamal')
        const userData = await userModel.findOne({ email });
        if (userData) {
            res.status(400).send({ success: false, message: "Username already exist" });
            return
        }
        if (email && password) {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = new userModel({
                email,
                password: hashedPassword
            });
            await user.save();

            res.status(200).send({ success: true, message: "User created successfully" });
        } else {
            res.status(400).send({ success: false, message: "Name and Password required" })
        }
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).send({ success: false, message: "Failed to create user" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = await userModel.findOne({ email });
            if (user) {
                const passwordMatched = await bcrypt.compare(password, user.password);
                if (passwordMatched) {
                    const token = jwt.sign({ userId: user?._id }, process.env.SECRET_KEY!, { expiresIn: "1d" });
                    res.status(200).send({ success: true, message: "Successfully logged in", token: token })
                } else {
                    res.status(401).send({ success: false, message: "Incorrect Password" })
                }
            } else {
                res.send({ success: false, message: "User not found" })
            }
        } else {
            res.status(400).send({ success: false, message: "Name and Password are required" })
        }
    }
    catch (error) {
        res.status(500).send({ success: false, message: "Login failed" })
    }
}