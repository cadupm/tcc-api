import { User } from '../entities/user.entity'

export class CreateUserDto {
    name: User['name']
    email: User['email']
    roles: User['roles']
    password: User['password']
}
