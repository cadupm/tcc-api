import { PartialType } from '@nestjs/mapped-types';
import { User } from 'src/users/entities/user.entity';
import { Teacher } from '../entities/teacher.entity';
import { CreateTeacherDto } from './create-teacher.dto';

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {
    name?: User['name']
    password?: User['password']
    registration?: Teacher['registration']
    profileImage?: User['profileImage']
    expertise?: User['expertise']
    bio?: User['bio']
    gitHubLink?: User['gitHubLink']
    linkedinLink?: User['linkedinLink']
    contact?: User['contact']
}
