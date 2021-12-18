import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Teacher } from '../entities/teacher.entity';

export class UpdateTeacherDto {
    @ApiProperty({ required: false, type: String, description: 'name' })
    @IsString()
    @IsOptional()
    name?: User['name']

    @ApiProperty({ required: false, type: String, description: 'email' })
    @IsString()
    @IsEmail()
    @IsOptional()
    email?: User['email']

    @ApiProperty({ required: false, type: String, description: 'password' })
    @IsString()
    @IsOptional()
    password?: User['password']

    @ApiProperty({ required: false, type: String, description: 'registration' })
    @IsString()
    @IsOptional()
    registration?: Teacher['registration']

    @ApiProperty({ required: false, type: String, description: 'expertise' })
    @IsString()
    @IsOptional()
    expertise?: User['expertise']

    @ApiProperty({ required: false, type: String, description: 'bio' })
    @IsString()
    @IsOptional()
    bio?: User['bio']

    @ApiProperty({ required: false, type: String, description: 'bio' })
    @IsString()
    @IsOptional()
    profileImage?: User['profileImage']

    @ApiProperty({ required: false, type: String, description: 'gitHubLink' })
    @IsString()
    @IsOptional()
    gitHubLink?: User['gitHubLink']

    @ApiProperty({ required: false, type: String, description: 'linkedinLink' })
    @IsString()
    @IsOptional()
    linkedinLink?: User['linkedinLink']

    @ApiProperty({ required: false, type: String, description: 'contact' })
    @IsString()
    @IsOptional()
    contact?: User['contact']
}
