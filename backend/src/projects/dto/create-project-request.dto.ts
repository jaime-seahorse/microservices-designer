import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectRequestDto {
    @ApiProperty()
    peojectName: string;
}
