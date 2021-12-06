import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator"
import { User } from "src/users/entities/user.entity"
import { Teacher } from "../entities/teacher.entity"

export class CreateTeacherDto {
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

    @IsString()
    @IsNotEmpty()
    registration: Teacher['registration']
}
