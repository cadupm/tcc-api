import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
