import { ApiProperty } from "@nestjs/swagger";
import { ProjectEntity } from "../entities/project.entity";

export class ProjectsFindedByIdResponseDto {
    
    @ApiProperty()
    projectId: number

    @ApiProperty()
    projectName: string
}