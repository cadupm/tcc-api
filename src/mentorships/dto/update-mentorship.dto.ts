import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';
import { Mentorship } from '../entities/mentorship.entity';

export class UpdateMentorshipDto {
    @ApiProperty({ required: false, type: String, description: 'isInvitationAccepted' })
    @IsOptional()
    @IsIn(['pending', 'accepted', 'refused'])
    isInvitationAccepted?: Mentorship['isInvitationAccepted']
}
