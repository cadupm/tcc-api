import { Submission } from "../entities/submission.entity"

export class UpdateSubmissionDto {
    description?: Submission['description']
    notReviewed?: Submission['notReviewed']
}