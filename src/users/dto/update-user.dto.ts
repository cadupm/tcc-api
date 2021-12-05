import { IsEmail, IsOptional, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class UpdateUserDto {
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
