import { ApiProperty } from "@nestjs/swagger";


export class LogInResponse {
    
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    id: number;
    
}