import mongoose from "mongoose";
import { User } from "./user.entity";
import { Organization } from "./organization/organization.entity";

export const MongooseObjectId = new mongoose.Types.ObjectId()
export type MongooseTypeObjectId = mongoose.Types.ObjectId;

export interface IUserTest extends User {
    save?: typeof jest.fn;
}

export interface IOrganizationTest extends Organization {
    save?: typeof jest.fn;
}