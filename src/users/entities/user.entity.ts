import { Student } from "src/students/entities/student.entity"
import { UserRole } from '@prisma/client'

export class User {
    id: string
    name: string
    email: string
    password: string
    roles: UserRole[]
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
