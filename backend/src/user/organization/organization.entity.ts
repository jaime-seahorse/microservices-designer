import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrganizationDocument = HydratedDocument<Organization>;


@Schema()
export class Organization {

    @Prop({ unique: true })
    @IsString()
    name: string;

    @Prop()
    @IsArray()
    userIds: mongoose.Types.ObjectId[];

    @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
    @IsArray()
    projectIds: mongoose.Types.ObjectId[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization)
