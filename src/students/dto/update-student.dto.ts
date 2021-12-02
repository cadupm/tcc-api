import { IsEmail, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Student } from '../entities/student.entity';

export class UpdateStudentDto {
    @IsString()
    name?: User['name']

    @IsString()
    @IsEmail()
    email?: User['email']

    @IsString()
    password?: User['password']

    @IsString()
    registration?: Student['registration']

    @IsString()
    profileImage?: User['profileImage']

    @IsString()
    expertise?: User['expertise']

    @IsString()
    bio?: User['bio']

    @IsString()
    gitHubLink?: User['gitHubLink']

    @IsString()
    linkedinLink?: User['linkedinLink']

    @IsString()
    contact?: User['contact']
}
