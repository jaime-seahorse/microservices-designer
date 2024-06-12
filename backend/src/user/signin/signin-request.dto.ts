import { ApiProperty } from "@nestjs/swagger";


export class SignInRequest {
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}
