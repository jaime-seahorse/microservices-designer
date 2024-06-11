import { ApiProperty } from "@nestjs/swagger";

export class GetBoundedContextByUserIdResponse{

    @ApiProperty() 
    boundeContextId: number;
    @ApiProperty()
    boundeContextName: string;

}