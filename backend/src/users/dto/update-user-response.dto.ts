import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "../../users/entities/user.entity";

export class UpdateResponseDto {

    @ApiProperty()
    message: string;

    @ApiProperty()
    userUpdated: UserEntity
}