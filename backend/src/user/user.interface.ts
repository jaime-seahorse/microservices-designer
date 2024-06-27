import mongoose from "mongoose";
import { User } from "./user.entity";

export interface IUserTest extends User {
    _id: mongoose.Types.ObjectId
}