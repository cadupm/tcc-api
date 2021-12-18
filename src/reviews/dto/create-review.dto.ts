import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Review } from "../entities/review.entity";

export class CreateReviewDto {
    @ApiProperty({ required: true, type: String, description: 'comment' })
    @IsString()
    @IsNotEmpty()
    comment: Review['comment']

    @ApiProperty({ required: true, type: Number, description: 'submissionId' })
    @IsNumber()
    @IsNotEmpty()
    submissionId: Review['submissionId']

    @ApiProperty({ required: true, type: String, description: 'mentorshipId' })
    @IsString()
    @IsNotEmpty()
    mentorshipId: Review['mentorshipId']
}
