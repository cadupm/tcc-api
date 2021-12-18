import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { Review } from "../entities/review.entity";

export class ListReviewDto {
    @ApiProperty({ required: false, type: String, description: 'comment' })
    @IsString()
    @IsOptional()
    comment?: Review['comment']

    @ApiProperty({ required: false, type: Number, description: 'submissionId' })
    @IsNumber()
    @IsOptional()
    submissionId?: Review['submissionId']

    @ApiProperty({ required: false, type: String, description: 'mentorshipId' })
    @IsString()
    @IsOptional()
    mentorshipId?: Review['mentorshipId']
}
