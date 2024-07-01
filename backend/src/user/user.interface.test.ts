import mongoose from "mongoose";
import { User } from "./user.entity";
import { Organization } from "./organization/organization.entity";

export const MongooseObjectId = new mongoose.Types.ObjectId()
export type MongooseTypeObjectId = mongoose.Types.ObjectId;

export interface IUserTest extends User {
    _id: MongooseTypeObjectId;
}

export interface IOrganizationTest extends Organization {
    _id: MongooseTypeObjectId;
}