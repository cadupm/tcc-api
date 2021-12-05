import { IsOptional, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Teacher } from '../entities/teacher.entity';

export class UpdateTeacherDto {
    @IsString()
    @IsOptional()
    name?: User['name']

    @IsString()
    @IsOptional()
    password?: User['password']

    @IsString()
    @IsOptional()
    registration?: Teacher['registration']

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
