import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Review } from "../entities/review.entity";

export class CreateReviewDto {
    @IsString()
    @IsNotEmpty()
    comment: Review['comment']

    @IsNumber()
    @IsNotEmpty()
    submissionId: Review['submissionId']

    @IsString()
    @IsNotEmpty()
    mentorshipId: Review['mentorshipId']
}
