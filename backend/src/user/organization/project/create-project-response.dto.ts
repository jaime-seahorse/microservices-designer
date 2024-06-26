import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";

export class CreateProjectResponse {
    
    @ApiProperty()
    projectId: mongoose.Types.ObjectId
    @ApiProperty()
    name: string
}