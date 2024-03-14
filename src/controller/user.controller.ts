import { Request, Response } from "express";
import mongoose from "mongoose";

import companyModel from "../models/company.model";
import { IUser } from "../models/user.model";

interface UserWithId extends IUser {
    _id: mongoose.Types.ObjectId
}
interface AuthenticateRequest extends Request {
    user?: UserWithId
}

export const getAllCompanyList = async (req: Request, res: Response) => {
    try {
        const company = await companyModel.find()
        res.status(200).send({ success: true, data: company })
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ success: false, message: error.message })
        }
        else {
            res.status(500).send({ success: false, message: "Internal server error" })
        }
    }
}

export const createCompany = async (req: AuthenticateRequest, res: Response) => {
    const { name, openingHours } = req.body;
    const user = req.user!
    try {
        const companyData = new companyModel({
            name: name,
            openingHours: openingHours,
            userId: user._id
        });
        await companyData.save();
        res.status(200).send({ success: true, data: companyData })
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ success: false, message: error.message })
        }
        else {
            res.status(500).send({ success: false, message: "Internal server error" })
        }
    }
}