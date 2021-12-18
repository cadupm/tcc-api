import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Student } from "../entities/student.entity";

export class CreateStudentDto {
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

    @ApiProperty({ required: true, type: String, description: 'registration' })
    @IsString()
    @IsNotEmpty()
    registration: Student['registration']
}
