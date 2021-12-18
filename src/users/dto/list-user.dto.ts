import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class ListUsertDto {
    @ApiProperty({ required: false, type: String, description: 'name' })
    @IsString()
    @IsOptional()
    name?: User['name']

    @ApiProperty({ required: false, type: String, description: 'email' })
    @IsString()
    @IsOptional()
    email?: User['email']
}
