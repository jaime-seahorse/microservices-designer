import { ApiProperty } from "@nestjs/swagger";
import { ProjectEntity } from "../entities/project.entity";

export class ProjectsFindedResponseDto {

    @ApiProperty({ example: 'Array of projects (examples)' })
    projects: ProjectEntity[]
    @ApiProperty()
    message: string = 'Projects finded'
}