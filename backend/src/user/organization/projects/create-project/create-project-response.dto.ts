import { ApiProperty } from "@nestjs/swagger";


export class CreateProjectResponse {
    
    @ApiProperty()
    projectId: number
    @ApiProperty()
    name: string

}