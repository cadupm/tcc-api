import { User } from '../entities/user.entity'
import { IsString, IsEmail, IsNotEmpty, IsArray } from 'class-validator'

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: User['name']

    @IsEmail()
    @IsNotEmpty()
    email: User['email']

    @IsNotEmpty()
    @IsArray()
    roles: User['roles']

    @IsString()
    @IsNotEmpty()
    password: User['password']
}
