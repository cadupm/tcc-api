import { IsNotEmpty, IsString, IsUUID } from "class-validator"
import { Submission } from "../entities/submission.entity"

export class CreateSubmissionDto {
    @IsString()
    @IsNotEmpty()
    description: Submission['description']

    @IsUUID()
    @IsNotEmpty()
    mentorshipId: Submission['mentorshipId']
}
