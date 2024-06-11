import { ApiProperty } from "@nestjs/swagger";

export class CreateBoundedContextResponseDto {

    @ApiProperty() 
    boundeContextId: number;
    @ApiProperty()
    boundeContextName: string;
}