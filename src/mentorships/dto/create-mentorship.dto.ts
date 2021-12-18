import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { Mentorship } from "../entities/mentorship.entity";

export class CreateMentorshipDto {
    @ApiProperty({ required: true, type: String, description: 'studentId' })
    @IsUUID()
    @IsNotEmpty()
    studentId: Mentorship['studentId']

    @ApiProperty({ required: true, type: String, description: 'teacherId' })
    @IsUUID()
    @IsNotEmpty()
    teacherId: Mentorship['teacherId']

    @ApiProperty({ required: false, type: String, description: 'isInvitationAccpeted' })
    @IsIn(['pending', 'accepted', 'refused'])
    @IsOptional()
    isInvitationAccepted?: Mentorship['isInvitationAccepted']
}
