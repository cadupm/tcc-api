import { User } from "src/users/entities/user.entity"

export class Teacher {
    id: string
    userId: string
    user?: User
    registration: string
    createdAt: Date
    updatedAt: Date
}
