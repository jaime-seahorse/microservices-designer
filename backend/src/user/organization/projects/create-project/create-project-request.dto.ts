import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectRequest {
    @ApiProperty()
    name: string;
}
