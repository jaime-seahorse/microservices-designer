import { ApiProperty } from "@nestjs/swagger";


export class LogInRequest {
    
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    organizationName: string;
}