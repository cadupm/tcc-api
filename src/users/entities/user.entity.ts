import { UserRole } from "@prisma/client"
import { Student } from "src/students/entities/student.entity"


export class User {
    id: string
    name: string
    email: string
    password: string
    roles: Array<"student" | "teacher">
    profileImage?: string
    expertise?: string
    bio?: string
    gitHubLink?: string
    linkedinLink?: string
    contact?: string
    student?: Student
    createdAt: Date
    updatedAt: Date
}
