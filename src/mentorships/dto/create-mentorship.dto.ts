import { IsIn, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { Mentorship } from "../entities/mentorship.entity";

export class CreateMentorshipDto {
    @IsUUID()
    @IsNotEmpty()
    studentId: Mentorship['studentId']

    @IsUUID()
    @IsNotEmpty()
    teacherId: Mentorship['teacherId']

    @IsIn(['pending', 'accepted', 'refused'])
    @IsOptional()
    isInvitationAccepted?: Mentorship['isInvitationAccepted']
}
