import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";


export class LogInResponse {
    @ApiProperty()
    userId: mongoose.Types.ObjectId;
    @ApiProperty()
    email: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    organizationId: mongoose.Types.ObjectId;
    @ApiProperty()
    organizationName: string;
}