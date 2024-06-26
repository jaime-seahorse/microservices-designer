import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNumber, IsString, IsDate } from "class-validator";
import mongoose, { HydratedDocument } from "mongoose";

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {

    @IsString({ message: 'Should be a valid name' })
    @Prop()
    name: string;

    @IsNumber()
    @Prop()
    organizationId: mongoose.Types.ObjectId;

    @IsDate({ message: 'Should be a valid date' })
    @Prop({ default: () => 'CURRENT_TIMESTAMP', nullable: false })
    createdAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);