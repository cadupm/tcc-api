import { IsArray, IsEmail, IsIn, IsNotEmpty, IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Student } from "../entities/student.entity";

export class CreateStudentDto {
    @IsString()
    @IsNotEmpty()
    name: User['name']

    @IsEmail()
    @IsNotEmpty()
    email: User['email']

    @IsNotEmpty()
    @IsArray()
    @IsIn([["student"], ["teacher"]])
    roles: User['roles']

    @IsString()
    @IsNotEmpty()
    password: User['password']

    @IsString()
    @IsNotEmpty()
    registration: Student['registration']
}
