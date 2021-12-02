import { IsEmail, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class UpdateUserDto {
    @IsString()
    name?: User['name']

    @IsString()
    @IsEmail()
    email?: User['email']

    @IsString()
    password?: User['password']

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
