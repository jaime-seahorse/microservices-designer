import { ApiProperty } from "@nestjs/swagger";
import { ProjectEntity } from "../entities/project.entity";

export class UpdateProjectResponseDto {

    @ApiProperty()
    projectUpdated: ProjectEntity[]

    @ApiProperty()
    message: string
}