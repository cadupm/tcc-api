import { User } from "src/users/entities/user.entity";
import { Student } from "../entities/student.entity";

export class CreateStudentDto {
    name: User['name']
    email: User['email']
    password: User['password']
    registration: Student['registration']
}
