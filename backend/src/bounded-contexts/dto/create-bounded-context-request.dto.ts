import { ApiProperty } from "@nestjs/swagger";

export class CreateBoundedContextRequestDto {


    @ApiProperty()
    boundeContextName: string;
   
}