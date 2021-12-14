import { Teacher } from "src/teachers/entities/teacher.entity"
import { Student } from "src/students/entities/student.entity"
import { Submission } from "src/submissions/entities/submission.entity"

export class Mentorship {
    id: string
    isInvitationAccepted:  'pending' | 'accepted' | 'refused' 
    studentId: Student['id']
    teacherId: Teacher['id']
    submissions?: Submission[]
    createdAt: Date
    updatedAt: Date
}
