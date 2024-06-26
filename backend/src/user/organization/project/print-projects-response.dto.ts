import { ApiProperty } from "@nestjs/swagger";
import mongoose from "mongoose";

export class PrintProjectsResponse {
    @ApiProperty()
    projectId: mongoose.Types.ObjectId;

    @ApiProperty()
    projectName: string;
}
