import { ApiProperty } from "@nestjs/swagger";

export class SignInResponse {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    organizationName: string;
}