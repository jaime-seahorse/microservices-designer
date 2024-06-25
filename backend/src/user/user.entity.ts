import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNumber, IsString, Length, } from 'class-validator';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type UserDocument = HydratedDocument<User>;


@Schema()
export class User {

    @IsString({ message: 'Should be a valid username' })
    @Length(3, 18)
    @Prop()
    name: string;

    @IsEmail({}, { message: 'Should be a valid email' })
    @Prop()
    email: string;

    @IsString({ message: 'Should be a valid password' })
    @Length(6, 60)
    @Prop()
    password: string;

    @Prop()
    organizationId: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;


}
export const UserSchema = SchemaFactory.createForClass(User)
