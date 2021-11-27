import { Submission } from "../entities/submission.entity"

export class CreateSubmissionDto {
    description: Submission['description']
    mentorshipId: Submission['mentorshipId']
}
