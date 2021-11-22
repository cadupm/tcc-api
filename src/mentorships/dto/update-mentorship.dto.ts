import { PartialType } from '@nestjs/mapped-types';
import { Mentorship } from '../entities/mentorship.entity';
import { CreateMentorshipDto } from './create-mentorship.dto';

export class UpdateMentorshipDto extends PartialType(CreateMentorshipDto) {
    isInvitationAccepted: Mentorship['isInvitationAccepted']
}
