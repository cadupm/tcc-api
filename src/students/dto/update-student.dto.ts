import { User } from 'src/users/entities/user.entity';
import { Student } from '../entities/student.entity';

export class UpdateStudentDto {
    name?: User['name']
    email?: User['email']
    password?: User['password']
    registration?: Student['registration']
    profileImage?: User['profileImage']
    expertise?: User['expertise']
    bio?: User['bio']
    gitHubLink?: User['gitHubLink']
    linkedinLink?: User['linkedinLink']
    contact?: User['contact']
}
