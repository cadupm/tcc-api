import { User } from "src/users/entities/user.entity"
import { Teacher } from "../entities/teacher.entity"

export class CreateTeacherDto {
    name: User['name']
    email: User['email']
    roles: User['roles']
    password: User['password']
    registration: Teacher['registration']
}
