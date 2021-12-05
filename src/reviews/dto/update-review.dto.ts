import { IsOptional, IsString } from "class-validator";
import { Review } from "../entities/review.entity";


export class UpdateReviewDto {
    @IsString()
    @IsOptional()
    comment?: Review['comment']
}
