import { Teacher } from ".prisma/client"
import { Student } from "src/students/entities/student.entity"

export class Mentorship {
    id: string
    isInvitationAccepted:  'pending' | 'accepted' | 'refused' 
    studentId: Student['id']
    teacherId: Teacher['id']
    createdAt: Date
    updatedAt: Date
}
