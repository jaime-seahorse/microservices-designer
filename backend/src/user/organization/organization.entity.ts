import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsString } from 'class-validator';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type OrganizationDocument = HydratedDocument<Organization>;


@Schema()
export class Organization {

    @Prop({ unique: true })
    @IsString()
    name: string;

    @Prop()
    @IsArray()
    userIds : mongoose.Types.ObjectId[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization)
