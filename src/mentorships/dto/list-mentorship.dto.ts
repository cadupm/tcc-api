import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsOptional, IsUUID } from "class-validator";
import { Mentorship } from "../entities/mentorship.entity";

export class ListMentorshipDto {
    @ApiProperty({ required: false, type: String, description: 'studentId' })
    @IsUUID()
    @IsOptional()
    studentId?: Mentorship['studentId']

    @ApiProperty({ required: false, type: String, description: 'teacherId' })
    @IsUUID()
    @IsOptional()
    teacherId?: Mentorship['teacherId']

    @ApiProperty({ required: false, type: String, description: 'isInvitationAccepted' })
    @IsIn(['pending', 'accepted', 'refused'])
    @IsOptional()
    isInvitationAccepted?: Mentorship['isInvitationAccepted']
}
