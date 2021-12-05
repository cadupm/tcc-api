import { IsEmail, IsOptional, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Student } from '../entities/student.entity';

export class UpdateStudentDto {
    @IsString()
    @IsOptional()
    name?: User['name']

    @IsString()
    @IsEmail()
    @IsOptional()
    email?: User['email']

    @IsString()
    @IsOptional()
    password?: User['password']

    @IsString()
    @IsOptional()
    registration?: Student['registration']

    @IsString()
    @IsOptional()
    profileImage?: User['profileImage']

    @IsString()
    @IsOptional()
    expertise?: User['expertise']

    @IsString()
    @IsOptional()
    bio?: User['bio']

    @IsString()
    @IsOptional()
    gitHubLink?: User['gitHubLink']

    @IsString()
    @IsOptional()
    linkedinLink?: User['linkedinLink']

    @IsString()
    @IsOptional()
    contact?: User['contact']
}
