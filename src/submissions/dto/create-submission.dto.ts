import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"
import { Submission } from "../entities/submission.entity"

export class CreateSubmissionDto {
    @IsString()
    @IsNotEmpty()
    description: Submission['description']

    @IsArray()
    @IsNotEmpty()
    filesUrl: Submission['filesUrl']

    @IsUUID()
    @IsNotEmpty()
    mentorshipId: Submission['mentorshipId']
}
