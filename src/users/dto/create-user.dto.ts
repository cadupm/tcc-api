import { User } from '../entities/user.entity'
import { IsString, IsEmail, IsNotEmpty, IsArray } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty({ required: true, type: String, description: 'name' })
    @IsString()
    @IsNotEmpty()
    name: User['name']

    @ApiProperty({ required: true, type: String, description: 'email' })
    @IsEmail()
    @IsNotEmpty()
    email: User['email']

    @ApiProperty({ required: true, type: Array, description: 'roles' })
    @IsNotEmpty()
    @IsArray()
    roles: User['roles']

    @ApiProperty({ required: true, type: String, description: 'password' })
    @IsString()
    @IsNotEmpty()
    password: User['password']
}
