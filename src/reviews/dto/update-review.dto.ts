import { IsString } from "class-validator";
import { Review } from "../entities/review.entity";


export class UpdateReviewDto {
    @IsString()
    comment?: Review['comment']
}
