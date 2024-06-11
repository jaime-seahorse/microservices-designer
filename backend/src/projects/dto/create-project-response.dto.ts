import { ApiProperty } from "@nestjs/swagger";


export class CreateProjectResponseDto {
    
    @ApiProperty()
    projectId: number
    @ApiProperty()
    projectName: string

}