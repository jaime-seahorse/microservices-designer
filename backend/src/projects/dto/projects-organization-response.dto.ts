import { ApiProperty } from "@nestjs/swagger";
import { ProjectEntity } from "../entities/project.entity";

export class ProjectsFindedByOrganizationResponseDto {
    @ApiProperty()
    projectId: number;

    @ApiProperty()
    name: string;
}