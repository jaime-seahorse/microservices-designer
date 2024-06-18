import { ApiProperty } from "@nestjs/swagger";

export class GetProjectsResponse {
    @ApiProperty()
    projectId: number;

    @ApiProperty()
    projectName: string;
}
