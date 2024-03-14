import { Schema, model } from "mongoose";

export interface IUser {
    email: string,
    password: string
}
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
},
    {
        timestamps: true
    }
)

export default model<IUser>("User", userSchema);