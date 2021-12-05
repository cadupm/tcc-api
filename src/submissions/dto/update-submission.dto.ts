import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator"
import { Submission } from "../entities/submission.entity"

export class UpdateSubmissionDto {
    @IsString()
    @IsOptional()
    description?: Submission['description']

    @IsArray()
    @IsOptional()
    filesUrl?: Submission['filesUrl']

    @IsBoolean()
    @IsOptional()
    notReviewed?: Submission['notReviewed']
}