import { ApiProperty } from "@nestjs/swagger";


export class LogInRequest {
    
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}