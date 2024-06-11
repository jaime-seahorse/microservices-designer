import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "../user.entity";

export class UpdateResponseDto {

    @ApiProperty()
    message: string;

    @ApiProperty()
    userUpdated: UserEntity
}