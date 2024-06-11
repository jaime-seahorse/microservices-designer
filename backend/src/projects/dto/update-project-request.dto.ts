import { ApiProperty } from "@nestjs/swagger";

export class UpdateProjectRequestDto {
    @ApiProperty()
    name: string;
}
