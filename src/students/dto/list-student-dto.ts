import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Student } from "../entities/student.entity";

export class ListStudentDto {
    @ApiProperty({ required: false, type: String, description: 'name' })
    @IsString()
    @IsOptional()
    name?: User['name']

    @ApiProperty({ required: false, type: String, description: 'email' })
    @IsString()
    @IsOptional()
    email?: User['email']

    @ApiProperty({ required: false, type: String, description: 'registration' })
    @IsString()
    @IsOptional()
    registration?: Student['registration']
}
