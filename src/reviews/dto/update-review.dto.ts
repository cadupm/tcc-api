import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { Review } from "../entities/review.entity";


export class UpdateReviewDto {
    @ApiProperty({ required: false, type: String, description: 'comment' })
    @IsString()
    @IsOptional()
    comment?: Review['comment']
}
