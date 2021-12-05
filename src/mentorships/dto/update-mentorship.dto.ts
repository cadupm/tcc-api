import { IsIn, IsOptional } from 'class-validator';
import { Mentorship } from '../entities/mentorship.entity';

export class UpdateMentorshipDto {
    @IsOptional()
    @IsIn(['pending', 'accepted', 'refused'])
    isInvitationAccepted?: Mentorship['isInvitationAccepted']
}
