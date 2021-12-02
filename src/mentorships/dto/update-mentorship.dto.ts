import { IsIn } from 'class-validator';
import { Mentorship } from '../entities/mentorship.entity';

export class UpdateMentorshipDto {
    @IsIn(['pending', 'accepted', 'refused'])
    isInvitationAccepted?: Mentorship['isInvitationAccepted']
}
