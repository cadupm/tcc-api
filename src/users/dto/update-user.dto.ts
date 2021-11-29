import { User } from '../entities/user.entity';

export class UpdateUserDto {
    name?: User['name']
    email?: User['email']
    password?: User['password']
    profileImage?: User['profileImage']
    expertise?: User['expertise']
    bio?: User['bio']
    gitHubLink?: User['gitHubLink']
    linkedinLink?: User['linkedinLink']
    contact?: User['contact']
}
