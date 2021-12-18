import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";

export class AuthDto {
    @ApiProperty({ required: true, type: String, description: 'email' })
    @IsEmail()
    email: User['email']

    @ApiProperty({ required: true, type: String, description: 'password' })
    @IsString()
    password: User['password']
}
