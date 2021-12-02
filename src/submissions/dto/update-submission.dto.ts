import { IsBoolean, IsString } from "class-validator"
import { Submission } from "../entities/submission.entity"

export class UpdateSubmissionDto {
    @IsString()
    description?: Submission['description']

    @IsBoolean()
    notReviewed?: Submission['notReviewed']
}