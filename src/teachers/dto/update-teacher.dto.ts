import { User } from 'src/users/entities/user.entity';
import { Teacher } from '../entities/teacher.entity';

export class UpdateTeacherDto {
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
