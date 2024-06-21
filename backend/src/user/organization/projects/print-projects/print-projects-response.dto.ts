import { ApiProperty } from "@nestjs/swagger";

export class PrintProjectsResponse {
    @ApiProperty()
    projectId: number;

    @ApiProperty()
    projectName: string;
}
