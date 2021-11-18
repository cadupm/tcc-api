import { User } from '../entities/user.entity'

export class CreateUserDto {
    name: User['name']
    email: User['email']
    password: User['password']
}
