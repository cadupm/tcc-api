import { Student } from "../entities/student.entity";

export class CreateStudentDto {
    userId: Student['userId']
    registration: Student['registration']
}
