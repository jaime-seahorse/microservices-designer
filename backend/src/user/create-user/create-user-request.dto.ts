import { ApiProperty } from "@nestjs/swagger";


export class CreateUserRequest {
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}
