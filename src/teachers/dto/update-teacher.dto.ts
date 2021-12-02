import { IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Teacher } from '../entities/teacher.entity';

export class UpdateTeacherDto {
    @IsString()
    name?: User['name']

    @IsString()
    password?: User['password']

    @IsString()
    registration?: Teacher['registration']

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
