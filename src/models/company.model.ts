import { Schema, model } from "mongoose";

import userModel from "./user.model";

const companySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    openingHours: [
        {
            date: { type: Date, required: true },
            day: { type: String, required: true },
            openingTime: { type: String, required: true },
            closingTime: { type: String, required: true }
        }
    ],
    userId: {
        type: Schema.Types.ObjectId,
        ref: userModel,
        required: true
    }
}, {
    timestamps: true
});

export default model<any>("Company", companySchema)