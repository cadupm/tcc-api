import { Mentorship } from "../entities/mentorship.entity";

export class CreateMentorshipDto {
    studentId: Mentorship['studentId']
    teacherId: Mentorship['teacherId']
    isInvitationAccepted?: Mentorship['isInvitationAccepted']
}
