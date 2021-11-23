import { User } from "src/users/entities/user.entity"

export class Student {
    id: string
    userId: string
    user?: User
    registration: string
    createdAt: Date
    updatedAt: Date
}
